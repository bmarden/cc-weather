import axios from 'axios';

const KEY = '149d79d69c2f198d0a00e9d41ab05253';

export default axios.create({
  baseURL: 'api.openweathermap.org/data/2.5/weather',
  params: {
    appid: 'KEY',
  },
});
