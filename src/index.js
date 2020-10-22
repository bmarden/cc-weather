import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './app/store';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './custom.scss';
import { fetchCurWx } from './components/currentWx/currentWxSlice';

// Will use this to load initial state of app
// import { fetchCurWx } from './components/currentWx/currentWxSlice';
// store.dispatch(fetchCurWx());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
