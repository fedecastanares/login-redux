import axios from 'axios';
import {
    LOADING_USERS,
    LOADING_USERS_SUCCESSFULLY,
    LOADING_USERS_ERROR,
    DELETE_USER

} from '../types';

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
                url: `http://${process.env.REACT_APP_BASE_URL}:${process.env.REACT_APP_PORT}/440/users`,
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

export function deleteUserAction(id) {
    return (dispatch) => {
        try {
            const token = getToken();
            var config = {
                method: 'delete',
                url: `http://${process.env.REACT_APP_BASE_URL}:${process.env.REACT_APP_PORT}/660/users/${id}`,
                headers: { 
                    'Authorization': `Bearer ${token}`}
                    };
            axios(config)
                .then(function (response) {
                    dispatch(deleteUser(id));
                })
              .catch(function (error){
                console.log(error)
              });
        } catch (error) {
            console.log(error)
        }
    }
}

const deleteUser = (id) => ({
    type: DELETE_USER,
    payload: id
})

const loadingUsers = (action) => ({
    type: LOADING_USERS,
    payload: action
})

const loadingUserSuccessfully = (users) => ({
    type: LOADING_USERS_SUCCESSFULLY,
    payload: users,
})