import { configureStore } from '@reduxjs/toolkit';
import currentWxReducer from '../components/currentWx/currentWxSlice';
import searchReducer from '../components/search/searchSlice';
import hourlyWxReducer from '../components/hourlyWx/hourlyWxSlice';

export default configureStore({
  reducer: {
    currentWx: currentWxReducer,
    hourlyWx: hourlyWxReducer,
    place: searchReducer,
  },
});
