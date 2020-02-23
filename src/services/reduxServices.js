const initialState = {
  authenticationRedux: false,
  needToRerender: false
};

const reducer = (state = initialState, action) => {
  const newState = {...state};
  // eslint-disable-next-line
  switch (action.type) {

    case 'AUTHENTIFICATION':
      newState.authenticationRedux = action.value;
      break;

    case 'NEEDTORERENDER':
      newState.needToRerender = action.value;
      break;

  }
  return newState;
};

export default reducer;
