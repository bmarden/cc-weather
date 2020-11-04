import axios from 'axios';

export default axios.create({
  baseURL: 'http://data.rcc-acis.org',
  headers: {
    'content-type': 'multipart/form-data',
  },
});
