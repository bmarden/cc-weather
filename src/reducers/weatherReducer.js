export default (state = [], action) => {
  switch (action.type) {
    case 'FETCH_CUR_WEATHER':
      return [...state, action.payload];
    default:
      return state;
  }
};
