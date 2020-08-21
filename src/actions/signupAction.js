import {
    SIGNUP_USER,
    SIGNUP_USERS_SUCCESSFULLY,
    SIGNUP_USERS_ERROR

} from '../types';

export function signupUserAction() {
    return () => {
        console.log('desde action');
    }
}
