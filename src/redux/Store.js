import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import userReducer from "./reducers/userReducer";
import selectedUserReducer from "./reducers/selectedUserReducer";
import userListReducer from "./reducers/userListReducer";

const rootReducer=combineReducers({
currentUser:userReducer,
selectedUser:selectedUserReducer,
userList:userListReducer
})

const store=createStore(rootReducer,applyMiddleware(thunk))
export default store;