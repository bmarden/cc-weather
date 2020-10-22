import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import openw from '../../api/openw';

const initialState = {
  currentWx: [],
  status: 'idle',
  error: null,
};

export const fetchCurWx = createAsyncThunk(
  'currentWx/fetchCurWx',
  async (searchTerm) => {
    const response = await openw.get('/weather', {
      q: searchTerm,
    });
    return response.data;
  }
);

const currentWxSlice = createSlice({
  name: 'currentWx',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchCurWx.pending]: (state, action) => {
      state.status = 'loading';
    },
    [fetchCurWx.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      // Add any fetched posts to the array
      state.currentWx = action.payload;
    },
    [fetchCurWx.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
  },
});

export default currentWxSlice.reducer;

// export default (state = [], action) => {
//   switch (action.type) {
//     case 'FETCH_CUR_WEATHER':
//       return [...state, action.payload];
//     default:
//       return state;
//   }
// };
// //
