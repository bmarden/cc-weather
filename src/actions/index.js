import openw from '../api/openw';

export const updateSearchTerm = (term) => {
  return {
    type: 'UPDATE_TERM',
    payload: term,
  };
};

export const fetchCurWeather = () => async (dispatch, getState) => {
  const response = await openw.get('/weather', {
    params: {
      q: getState().term,
    },
  });

  console.log(response.data);
  dispatch({ type: 'FETCH_CUR_WEATHER', payload: response.data });
};

export const fetchHourlyForecast = (coords) => async (dispatch) => {
  dispatch({ type: 'GET_FORECAST_REQUEST' });
  const response = await openw.get('/onecall', {
    params: {
      lat: coords.lat,
      lon: coords.lon,
    },
  });
  dispatch({ type: 'GET_FORECAST_SUCCESS', payload: response.data });
};
