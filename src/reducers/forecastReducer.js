const initState = { data: [], isLoaded: false };
export default (state = initState, action) => {
  switch (action.type) {
    case 'GET_FORECAST_REQUEST':
      return { ...state, isLoaded: false };
    case 'GET_FORECAST_SUCCESS':
      return { ...state, data: action.payload, isLoaded: true };
    case 'GET_FORECAST_FAILURE':
      return {
        ...state,
        isLoaded: false,
        errorMessage: action.payload.message,
      };
    default:
      return state;
  }
};
