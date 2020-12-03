import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import openw from '../../api/openw';

const initialState = {
  curWx: [],
  status: 'idle',
  error: null,
};

export const fetchCurWx = createAsyncThunk('currentWx/fetchCurWx', async (search) => {
  const response = await openw.get('/weather', {
    params: {
      q: search,
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
    [fetchCurWx.pending]: (state, action) => {
      state.status = 'loading';
    },
    [fetchCurWx.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      // Add any fetched posts to the array
      state.curWx = action.payload;
    },
    [fetchCurWx.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
  },
});

export default currentWxSlice.reducer;
