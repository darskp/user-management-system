import { combineReducers, createStore } from 'redux';
import userReducer from './reducers/userReducer';
import userListReducer from './reducers/userListReducer';

const rootReducer = combineReducers({
  currentUser: userReducer,
  userList: userListReducer,
});

const store = createStore(rootReducer);

export default store;




