import {
    LOADING_USERS,
    LOADING_USERS_SUCCESSFULLY,
    LOADING_USERS_ERROR

} from '../types';

const initialState = {
    users: [],
    error: false,
    loading: true,
}

export default function(state = initialState, action){
    switch(action.type) {
        case LOADING_USERS:
            return {
                loading: action.payload
            }
        case LOADING_USERS_SUCCESSFULLY:
            return {
                users: action.payload,
                loading: false,
            }
        default:
            return state;
    }
}