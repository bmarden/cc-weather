import axios from 'axios';

export default axios.create({
  baseURL: 'http://data.rcc-acis.org',
  params: {
    sdate: 'por',
    edate: 'por',
  },
});
