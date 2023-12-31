let initialState={
    userList: [],
    error: null,
}

const userListReducer = (state =initialState, action) => {
    switch (action.type) {
        case 'SET_USER_LIST':
            return {
                ...state,
                userList: action.payload,
                    error: null,
            };
        case 'SET_ERROR':
            return {
                ...state,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default userListReducer;