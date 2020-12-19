/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { differenceInDays, format, getUnixTime, parseISO } from 'date-fns';
import _ from 'lodash';
import acis from '../../api/acis';

// Return the largest date range for sortComparer function to sort ids
const getMaxDayDiff = (stn1, stn2) => {
  const stn1Recency = differenceInDays(new Date(), new Date(stn1[1]));
  const stn2Recency = differenceInDays(new Date(), new Date(stn2[1]));
  const recency = stn1Recency - stn2Recency;
  if (recency !== 0) {
    return recency;
  }
  const stn1Coverage = differenceInDays(new Date(stn1[1]), new Date(stn1[0]));
  const stn2Coverage = differenceInDays(new Date(stn2[1]), new Date(stn2[0]));
  const coverage = Math.abs(stn1Coverage - stn2Coverage);
  return coverage;
};

export const fetchStationData = createAsyncThunk(
  'histWx/fetchStationData',
  async (args) => {
    let form = new FormData();
    for (let [key, value] of Object.entries(args)) {
      form.append(key, value);
    }
    const response = await acis.post('/StnMeta', form);
    return response.data;
  }
);

export const fetchHistData = createAsyncThunk(
  'histWx/fetchHistData',
  async (histParams) => {
    let form = new FormData();
    for (let [key, value] of Object.entries(histParams)) {
      form.append(key, value);
    }
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
    [fetchHistData.pending]: (state, action) => {
      state.tempDataStatus = 'loading';
    },
    [fetchHistData.fulfilled]: (state, action) => {
      state.tempDataStatus = 'succeeded';
      let filtered = _.chain(action.payload.data)
        .filter((i) => !i.includes('M')) // Filter out dates with missing data
        .zipMod() // Merge dates and all other data points into individual arrays
        .unixDates() // Convert dates to unix time and include a date for each data point
        .value();
      state.tempData = filtered;
    },
    [fetchHistData.rejected]: (state, action) => {
      state.tempDataStatus = 'failed';
      state.tempDataError = action.error.message;
    },
  },
});

export default histWxSlice.reducer;

export const selectStations = (state) => state.histWx.stations;
