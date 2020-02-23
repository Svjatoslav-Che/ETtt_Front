const initialState = {
  authenticationRedux: false,
};

const reducer = (state = initialState, action) => {
  const newState = {...state};
  // eslint-disable-next-line
  switch (action.type) {

    case 'AUTHENTIFICATION':
      newState.authenticationRedux = action.value;
      break;

  }
  return newState;
};

export default reducer;
