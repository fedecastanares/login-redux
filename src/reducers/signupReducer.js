import {
    SIGNUP_USER,
    SIGNUP_USERS_SUCCESSFULLY,
    SIGNUP_USERS_ERROR,
    HIDE_ALERT
} from '../types';

const initialState = {
    error: false,
    auth: false,
}

export default function(state = initialState, action){
    switch(action.type) {
        case SIGNUP_USER:
            return {
                ...state
            }
        case SIGNUP_USERS_SUCCESSFULLY:
            return {
                ...state,
                auth: action.payload
            }
        case SIGNUP_USERS_ERROR:
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