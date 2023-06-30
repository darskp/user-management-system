const selectedUserReducer = (state = {
    selectedUser: null,
    error: null,
}, action) => {
    switch (action.type) {
        case 'SET_SELECTED_USER':
            return {
                ...state,
                selectedUser: action.payload,
                error: null,
            };
        case 'SET_ERROR': {
            return {
                ...state, 
                error: action.payload
            }
        }
        default:
            return state;
    }
};

export default selectedUserReducer;