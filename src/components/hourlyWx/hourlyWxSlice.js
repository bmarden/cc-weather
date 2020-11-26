import {
  createAsyncThunk,
  createSlice,
  createEntityAdapter,
} from '@reduxjs/toolkit';

import openw from '../../api/openw';

// Use reduxjs/toolkit to normalize data in the store
// Store hourly data as the entity and use time (dt) as the unique key
const hourlyWxAdapter = createEntityAdapter({
  selectId: (hour) => hour.dt,
});

const initialState = hourlyWxAdapter.getInitialState({
  status: 'idle',
  error: null,
});

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
    // eslint-disable-next-line no-unused-vars
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
