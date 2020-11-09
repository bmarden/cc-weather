import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { differenceInDays, format, subMonths } from 'date-fns';
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
      let filtered = _.filter(
        action.payload.data,
        (item) => !item.includes('M')
      );
      state.tempData = _.zip(...filtered);
    },
    [fetchHistTemp.rejected]: (state, action) => {
      state.tempDataStatus = 'failed';
      state.dataError = action.error.message;
    },
  },
});

export default histWxSlice.reducer;

export const selectStations = (state) => state.histWx.stations;
