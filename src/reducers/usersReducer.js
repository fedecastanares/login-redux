import {
    LOADING_USERS,
    LOADING_USERS_SUCCESSFULLY,
    LOADING_USERS_ERROR

} from '../types';

const initialState = {
    users: [],
    error: false,
    loading: false,
}

export default function(state = initialState, action){
    switch(action.type) {
        default:
            return state;
    }
}