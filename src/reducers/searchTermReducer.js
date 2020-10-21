export default (state = '', action) => {
  switch (action.type) {
    case 'UPDATE_TERM':
      return action.payload;

    default:
      return state;
  }
};
