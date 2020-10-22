import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentWx: [],
  status: 'idle',
  error: null,
};

const currentWxSlice = createSlice({
  name: 'currentWx',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPosts.pending]: (state, action) => {
      state.status = 'loading';
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      // Add any fetched posts to the array
      state.posts = state.posts.concat(action.payload);
    },
    [fetchPosts.rejected]: (state, action) => {
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
