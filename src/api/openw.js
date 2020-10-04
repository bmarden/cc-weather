import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5',
  params: {
    q: '',
    units: 'imperial',
    appid: process.env.REACT_APP_OW_API_KEY,
  },
});
