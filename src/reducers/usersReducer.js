import {
    LOADING_USERS,
    LOADING_USERS_SUCCESSFULLY,
    LOADING_USERS_ERROR,
    DELETE_USER

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
                ...state,
                loading: action.payload,
            }
        case LOADING_USERS_SUCCESSFULLY:
            return {
                ...state,
                users: action.payload,
                loading: false,
            }
        case DELETE_USER:
            return {
                ...state,
                users: state.users.filter((user) => user.id !== action.payload)
            }
        default:
            return state;
    }
}