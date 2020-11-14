import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  place: [],
  status: 'idle',
  error: null,
};
const searchSlice = createSlice({
  name: 'search',
  initialState: initialState,
  reducers: {
    updatePlace: (state, action) => {
      state.status = 'loaded';
      state.place = action.payload;
    },
  },
});

export const { updatePlace } = searchSlice.actions;
export default searchSlice.reducer;
