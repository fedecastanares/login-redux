import axios from 'axios';
import {
    LOGIN_USER ,
    LOGIN_USERS_SUCCESSFULLY,
    LOGIN_USERS_ERROR,
    HIDE_ALERT
} from '../types';

import {IP, port} from '../config/';

import {authenticateUser, getToken, dataUser} from '../components/auth';

export function loginUserAction(user) {
    return (dispatch) => {
        dispatch(loginUser());
        try {
            axios.post(`http://${IP}:${port}/login`, {
                email: user.email,
                password: user.password
              })
              .then(function (response) {
                  authenticateUser(response.data.accessToken);
                  const token = getToken();
                  var config = {
                    method: 'get',
                    url: `http://${IP}:${port}/440/users?email=${user.email}`,
                    headers: { 
                      'Authorization': `Bearer ${token}`
                    }
                  };
                  axios(config)
                  .then(function (response) {
                    dataUser(response.data[0].firstName, response.data[0].lastName);
                    dispatch(hideAlert());
                    dispatch(loginUserSuccessfully());
                  })
              })
              .catch(function (error){
                dispatch(loginUserError({type: 'warning', msg: 'wrong password or email'}))
              });
        } catch (error) {
            dispatch(loginUserError({type: 'error', msg: 'Server not respond'}))
        }
    }
}

export function showAlert(alert) {
  return (dispatch) => {
    dispatch(loginUserError(alert))
  }
}

const loginUser = () => ({
    type: LOGIN_USER,
    payload: true,
})

const loginUserSuccessfully = () => ({
    type: LOGIN_USERS_SUCCESSFULLY,
    payload: true,
})

const loginUserError = (error) => ({
    type: LOGIN_USERS_ERROR,
    payload: error,
})

const hideAlert = () => ({
    type: HIDE_ALERT,
    payload: false
})