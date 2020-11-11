import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  place: [],
  status: 'idle',
  error: null,
};
const searchSlice = createSlice({
  name: 'search',
  initialState: {},
  reducers: {
    updatePlace: (state, action) => {
      state.place = action.payload;
    },
  },
});

export const { updatePlace } = searchSlice.actions;
export default searchSlice.reducer;
