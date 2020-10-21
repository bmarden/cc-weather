import { combineReducers } from 'redux';
import weatherReducer from './weatherReducer';
import searchTermReducer from './searchTermReducer';
import forecastReducer from './forecastReducer';

export default combineReducers({
  term: searchTermReducer,
  weather: weatherReducer,
  forecast: forecastReducer,
});
