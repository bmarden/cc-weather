import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  hourlyWx: [],
  status: 'idle',
  error: null,
};
const hourlyWxSlice = createSlice({
  name: 'hourlyWx',
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

export default hourlyWxSlice.reducer;
// const initState = { data: [], isLoaded: false };
// export default (state = initState, action) => {
//   switch (action.type) {
//     case 'GET_FORECAST_REQUEST':
//       return { ...state, isLoaded: false };
//     case 'GET_FORECAST_SUCCESS':
//       return { ...state, data: action.payload, isLoaded: true };
//     case 'GET_FORECAST_FAILURE':
//       return {
//         ...state,
//         isLoaded: false,
//         errorMessage: action.payload.message,
//       };
//     default:
//       return state;
//   }
// };
