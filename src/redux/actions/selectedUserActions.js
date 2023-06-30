export const setSelectedUser = (user) => {
  return {
    type: 'SET_SELECTED_USER',
    payload: user,
  };
};

export const setError = (msg) => {
  return {
    type: 'SET_ERROR',
    payload: msg,
  };
};