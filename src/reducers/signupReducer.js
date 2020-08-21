import {
    SIGNUP_USER,
    SIGNUP_USERS_SUCCESSFULLY,
    SIGNUP_USERS_ERROR

} from '../types';

const initialState = {
    userData: [],
    error: false,
    loading: false,
}

export default function(state = initialState, action){
    switch(action.type) {
        default:
            return state;
    }
}