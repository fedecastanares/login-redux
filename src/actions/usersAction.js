import axios from 'axios';
import {
    LOADING_USERS,
    LOADING_USERS_SUCCESSFULLY,
    LOADING_USERS_ERROR

} from '../types';

import {IP, port} from '../config/';
import {getToken} from '../components/auth';

export function loadUsersAction() {
    return () => {
        console.log('desde action');
    }
}


export function loadingUserAction() {
    return (dispatch) => {
        dispatch(loadingUsers(true));
        try {
            const token = getToken();
            var config = {
                method: 'get',
                url: `http://${IP}:${port}/440/users`,
                headers: { 
                    'Authorization': `Bearer ${token}`}
                    };
            axios(config)
                .then(function (response) {
                    dispatch(loadingUserSuccessfully(response.data))
                    dispatch(loadingUsers(false));
                })
              .catch(function (error){
                console.log(error)
              });
        } catch (error) {
            console.log(error)
        }
    }
}

const loadingUsers = (action) => ({
    type: LOADING_USERS,
    payload: action
})

const loadingUserSuccessfully = (users) => ({
    type: LOADING_USERS_SUCCESSFULLY,
    payload: users,
})