import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import openw from '../../api/openw';

const initialState = {
  curWx: [],
  hourlyWx: [],
  dailyWx: [],
  status: 'idle',
  error: null,
};

export const fetchWeather = createAsyncThunk('currentWx/fetchCurWx', async (coords) => {
  const response = await openw.get('/onecall', {
    params: {
      lat: coords.lat,
      lon: coords.lon,
    },
  });
  return response.data;
});

const currentWxSlice = createSlice({
  name: 'curWx',
  initialState,
  reducers: {},
  extraReducers: {
    // eslint-disable-next-line no-unused-vars
    [fetchWeather.pending]: (state, action) => {
      state.status = 'loading';
    },
    [fetchWeather.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      // Add any fetched posts to the array
      state.curWx = action.payload.current;
      state.hourlyWx = action.payload.hourly;
      state.dailyWx = action.payload.daily;
    },
    [fetchWeather.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
  },
});

export default currentWxSlice.reducer;
