import {
    LOADING_USERS,
    LOADING_USERS_SUCCESSFULLY,
    LOADING_USERS_ERROR

} from '../types';

export function loadUsersAction() {
    return () => {
        console.log('desde action');
    }
}
