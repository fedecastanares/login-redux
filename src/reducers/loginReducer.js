import {
    LOGIN_USER,
    LOGIN_USERS_SUCCESSFULLY,
    LOGIN_USERS_ERROR,
    HIDE_ALERT

} from '../types';


const initialState = {
    error: false,
    auth: false,
}

export default function(state = initialState, action){
    switch(action.type) {
        case LOGIN_USER:
            return {
                ...state,
            }
        case LOGIN_USERS_SUCCESSFULLY:
            return {
                ...state,
                auth: action.payload
            }
        case LOGIN_USERS_ERROR:
            return {
                error: action.payload
            }
        case HIDE_ALERT:
            return {
                error: false
            }
        default:
            return state;
    }
}