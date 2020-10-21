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
