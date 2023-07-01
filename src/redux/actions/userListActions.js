export const setUserList = (users) => {
  return {
    type: 'SET_USER_LIST',
    payload: users,
  };
};

export const setError = (msg) => {
  return {
    type: 'SET_ERROR',
    payload: msg,
  };
};
