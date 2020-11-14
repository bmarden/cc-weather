/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  differenceInDays,
  format,
  subMonths,
  getUnixTime,
  parseISO,
} from 'date-fns';
import _ from 'lodash';
import acis from '../../api/acis';

// Return the largest date range for sortComparer function to sort ids
const getMaxDayDiff = (range1, range2) => {
  const range1Diff = differenceInDays(new Date(range1[1]), new Date(range1[0]));
  const range2Diff = differenceInDays(new Date(range2[1]), new Date(range2[0]));
  return range1Diff < range2Diff ? 1 : -1;
};

export const fetchStationData = createAsyncThunk(
  'histWx/fetchStationData',
  async (args) => {
    let form = new FormData();
    form.append('bbox', `${args}`);
    form.append('meta', ['name', 'sids', 'uid', 'valid_daterange']);
    form.append('elems', ['maxt', 'mint']);
    form.append('sdate', format(new Date(), 'yyyy-MM-dd'));
    const response = await acis.post('/StnMeta', form);
    return response.data;
  }
);

export const fetchHistTemp = createAsyncThunk(
  'histWx/fetchHistTemp',
  async (_, { getState }) => {
    const stations = selectStations(getState());
    let form = new FormData();
    form.append('sid', stations[0].sids[0]);
    // subtract 12 months from todays date as a start date to get data
    form.append('sdate', format(subMonths(new Date(), 12), 'yyyy-MM-dd'));
    form.append('edate', format(new Date(), 'yyyy-MM-dd'));
    form.append('elems', ['maxt', 'mint', 'avgt']);
    form.append('meta', []);
    const response = await acis.post('/StnData', form);
    return response.data;
  }
);

const initialState = {
  stations: [],
  tempData: [],
  stationsStatus: 'idle',
  stationsError: null,
  tempDataStatus: 'idle',
  tempDataError: null,
};

// Helper lodash functions to reformat data from ACIS
_.mixin({
  zipMod: (arrays) => {
    return _.zip.apply(_, arrays);
  },
  unixDates: function (arrays) {
    let dates = _.map(arrays[0], function (i) {
      // Convert to milliseconds
      return getUnixTime(parseISO(i)) * 1000;
    });
    // Exclude the dates array from main array
    arrays.shift();
    let newArray = [];
    // For each weather stat returned - Merge the date and stat so each data
    // point has date associated with it
    arrays.forEach((arr) => {
      let tmp = [];
      arr.forEach((item, i) => {
        let inner = _.concat(dates[i], parseInt(item, 10));
        tmp.push(inner);
      });
      newArray.push(tmp);
    });
    return newArray;
  },
});

const histWxSlice = createSlice({
  name: 'histWx',
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [fetchStationData.pending]: (state, action) => {
      state.stationsStatus = 'loading';
    },
    [fetchStationData.fulfilled]: (state, action) => {
      state.stationsStatus = 'succeeded';
      state.stations = action.payload.meta;
      state.stations.sort((a, b) =>
        getMaxDayDiff(a.valid_daterange[0], b.valid_daterange[0])
      );
    },
    [fetchStationData.rejected]: (state, action) => {
      state.stationsStatus = 'failed';
      state.stationsError = action.error.message;
    },
    [fetchHistTemp.pending]: (state, action) => {
      state.tempDataStatus = 'loading';
    },
    [fetchHistTemp.fulfilled]: (state, action) => {
      state.tempDataStatus = 'succeeded';
      let filtered = _.chain(action.payload.data)
        .filter((i) => !i.includes('M')) // Filter out dates with missing data
        .zipMod() // Merge dates and all other data points into individual arrays
        .unixDates() // Convert dates to unix time and include a date for each data point
        .value();
      state.tempData = filtered;
    },
    [fetchHistTemp.rejected]: (state, action) => {
      state.tempDataStatus = 'failed';
      state.tempDataError = action.error.message;
    },
  },
});

export default histWxSlice.reducer;

export const selectStations = (state) => state.histWx.stations;
