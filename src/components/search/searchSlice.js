import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const searchSlice = createSlice({
  name: 'search',
  initialState: initialState,
  reducers: {
    updatedPlace(state, action) {
      state.push(action.payload);
    },
  },
});

export const { updatedPlace } = searchSlice.actions;
export default searchSlice.reducer;
