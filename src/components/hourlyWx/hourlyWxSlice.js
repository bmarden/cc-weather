import {
  createAsyncThunk,
  createSlice,
  createSelector,
  createEntityAdapter,
} from '@reduxjs/toolkit';

import { convertUnixTime } from '../../common/utils';
import openw from '../../api/openw';

const hourlyWxAdapter = createEntityAdapter({
  selectId: (hour) => {
    return convertUnixTime(hour.dt);
  },
});

const initialState = hourlyWxAdapter.getInitialState({
  status: 'idle',
  error: null,
});

// const coords = { lat: '39.727879', lon: '-121.836879' };

export const fetchHourlyWx = createAsyncThunk(
  'hourlyWx/fetchHourlyWx',
  async (coords) => {
    const response = await openw.get('/onecall', {
      params: {
        lat: coords.lat,
        lon: coords.lon,
      },
    });
    return response.data.hourly;
  }
);

const hourlyWxSlice = createSlice({
  name: 'hourlyWx',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchHourlyWx.pending]: (state, action) => {
      state.status = 'loading';
    },
    [fetchHourlyWx.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      // Add any fetched posts to the array
      hourlyWxAdapter.setAll(state, action.payload);
    },
    [fetchHourlyWx.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
  },
});

export default hourlyWxSlice.reducer;

export const {
  selectAll: selectAllHourlyData,
  selectById: selectHourById,
  selectIds: selectAllHours,
} = hourlyWxAdapter.getSelectors((state) => state.hourlyWx);
