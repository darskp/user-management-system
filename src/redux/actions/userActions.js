export const setCurrentUser = (user) => {
  return {
    type: 'SET_CURRENT_USER',
    payload: user,
  };
};

export const logoutUser = () => {
  return {
    type: 'LOGOUT_USER',
  };
};