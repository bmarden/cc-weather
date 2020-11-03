import {
  createAsyncThunk,
  createSlice,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import { differenceInDays } from 'date-fns';

import noaa from '../../api/noaa';
import acis from '../../api/acis';

// Return the largest date range for sortComparer function to sort ids
const getMaxDayDiff = (range1, range2) => {
  const range1Diff = differenceInDays(
    new Date(range1.maxdate),
    new Date(range1.mindate)
  );
  const range2Diff = differenceInDays(
    new Date(range2.maxdate),
    new Date(range2.mindate)
  );
  return range1Diff > range2Diff ? 1 : -1;
};

const histWxAdapter = createEntityAdapter();

export const fetchStationData = createAsyncThunk(
  'histWx/fetchStationData',
  async (bounds) => {
    const response = await noaa.get('/stations', {
      params: {
        datasetid: 'GHCND',
        datacategoryid: 'TEMP',
        extent: bounds,
      },
    });
    return response.data.results;
  }
);

export const fetchStationDataAcis = createAsyncThunk(
  'histWx/fetchStationDataAcis',
  async (params) => {
    const response = await acis.get('/StnMeta', {
      params: {
        bbox: `${params.w},${params.s}, ${params.e}, ${params.n}`,
      },
    });
    return response.data;
  }
);

export const fetchHistTemp = createAsyncThunk(
  'histWx/fetchHistTemp',
  async () => {
    const response = await noaa.get('/data', {
      params: {},
    });
    return response.data;
  }
);

const histWxSlice = createSlice({
  name: 'histWx',
  initialState: histWxAdapter.getInitialState({
    status: 'idle',
    error: null,
  }),
  reducers: {},
  extraReducers: {
    [fetchStationData.pending]: (state, action) => {
      state.status = 'loading';
    },
    [fetchStationData.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      histWxAdapter.setAll(state, action.payload);
    },
    [fetchStationData.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
  },
});

export default histWxSlice.reducer;

export const {
  selectAll: selectAllStations,
  selectById: selectStationById,
  selectIds: selectAllStationIds,
} = histWxAdapter.getSelectors((state) => state.histWx);
