import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import openw from '../../api/openw';

const initialState = {
  hourlyWx: [],
  status: 'idle',
  error: null,
};

const coords = { lat: '39.727879', lon: '-121.836879' };

export const fetchHourlyWx = createAsyncThunk(
  'hourlyWx/fetchHourlyWx',
  async (coords) => {
    const response = await openw.get('/onecall', {
      params: {
        lat: coords.lat,
        lon: coords.lon,
      },
    });
    return response.data;
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
      state.hourlyWx = action.payload;
    },
    [fetchHourlyWx.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
  },
});

export default hourlyWxSlice.reducer;
