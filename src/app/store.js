import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from '../components/weather/weatherSlice';
import searchReducer from '../components/search/searchSlice';
import historicalWxReducer from '../components/historicalWx/histWxSlice';

export default configureStore({
  reducer: {
    weather: weatherReducer,
    search: searchReducer,
    histWx: historicalWxReducer,
  },
});
