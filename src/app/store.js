import { configureStore } from '@reduxjs/toolkit';
import currentWxReducer from '../components/currentWx/currentWxSlice';
import searchTermReducer from './searchTermReducer';
import hourlyWxReducer from '../components/hourlyWx/hourlyWxSlice';

export default configureStore({
  reducer: {
    term: searchTermReducer,
    currentWx: currentWxReducer,
    hourlyWx: hourlyWxReducer,
  },
});
