import {
  createAsyncThunk,
  createSlice,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import { differenceInDays } from 'date-fns';

import noaa from '../../api/noaa';

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

const histWxAdapter = createEntityAdapter({
  sortComparer: (a, b) => getMaxDayDiff(a, b),
});

export const fetchStationData = createAsyncThunk(
  'histWx/fetchStationData',
  async (bounds) => {
    const response = await noaa.get('/stations', {
      params: {
        extent: bounds,
      },
    });
    return response.data.results;
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
