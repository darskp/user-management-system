export const setCurrentUser = (email,token) => {
  return {
    type: 'SET_CURRENT_USER',
    payload: {email,token},
  };
};

export const logoutUser = () => {
  return {
    type: 'LOGOUT_USER',
  };
};