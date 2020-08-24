import axios from 'axios';
import {
    LOGIN_USER ,
    LOGIN_USERS_SUCCESSFULLY,
    LOGIN_USERS_ERROR
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
                    dispatch(loginUserSuccessfully());
                  })
              })
              .catch(function (error){
                dispatch(loginUserError(error))
              });
        } catch (error) {
            dispatch(loginUserError(error))
        }
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