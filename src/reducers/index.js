import { combineReducers } from 'redux';
import usersReducer from './usersReducer';
import loginReducer from './loginReducer';
import signupReducer from './signupReducer';


export default combineReducers({
    users: usersReducer,
    login: loginReducer,
    signup: signupReducer
})