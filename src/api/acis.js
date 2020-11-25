import axios from 'axios';

export default axios.create({
  baseURL: 'https://data.rcc-acis.org',
  headers: {
    'content-type': 'multipart/form-data',
  },
});
