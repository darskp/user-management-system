const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      return action.payload;
    case 'LOGOUT_USER':
      return null;
    default:
      return state;
  }
};

export default userReducer;