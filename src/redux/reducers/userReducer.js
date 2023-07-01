let initialState = {
  email: null,
  token: null
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      return {
        email: action.payload.email,
        token: action.payload.token
      };
    case 'LOGOUT_USER':
      return { email: null, token: null };
    default:
      return state;
  }
};

export default userReducer;