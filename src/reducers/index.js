import { combineReducers } from 'redux';
import weatherReducer from './weatherReducer';
import searchTermReducer from './searchTermReducer';

export default combineReducers({
  term: searchTermReducer,
  weather: weatherReducer,
});
