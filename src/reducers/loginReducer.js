import {
    LOGIN_USER,
    LOGIN_USERS_SUCCESSFULLY,
    LOGIN_USERS_ERROR

} from '../types';

const initialState = {
    userData: [],
    error: false,
    loading: false,
    auth: false,
}

export default function(state = initialState, action){
    switch(action.type) {
        case LOGIN_USER:
            return {
                ...state,
                loading: action.payload,
            }
        case LOGIN_USERS_SUCCESSFULLY:
            return {
                ...state,
                loading: false,
                auth: action.payload
            }
        case LOGIN_USERS_ERROR:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}