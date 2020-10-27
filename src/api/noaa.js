import axios from 'axios';

export default axios.create({
  baseURL: 'https://www.ncdc.noaa.gov/cdo-web/api/v2/',
  headers: {
    token: process.env.REACT_APP_NOAA_API_KEY,
  },
});
