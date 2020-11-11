import { configureStore } from '@reduxjs/toolkit';
import currentWxReducer from '../components/currentWx/currentWxSlice';
import searchReducer from '../components/search/searchSlice';
import hourlyWxReducer from '../components/hourlyWx/hourlyWxSlice';
import historicalWxReducer from '../components/historicalWx/histWxSlice';

export default configureStore({
  reducer: {
    currentWx: currentWxReducer,
    hourlyWx: hourlyWxReducer,
    search: searchReducer,
    histWx: historicalWxReducer,
  },
});
