import axios from 'axios';
import {
    LOGIN_USER ,
    LOGIN_USERS_SUCCESSFULLY,
    LOGIN_USERS_ERROR
} from '../types';

import {authenticateUser, getToken, dataUser} from '../components/auth';

export function loginUserAction(user) {
    return (dispatch) => {
        dispatch(loginUser());
        try {
            axios.post('http://192.168.1.104:8000/login', {
                email: user.email,
                password: user.password
              })
              .then(function (response) {
                  authenticateUser(response.data.accessToken);
                  const token = getToken();
                  var config = {
                    method: 'get',
                    url: `http://192.168.1.104:8000/440/users?email=${user.email}`,
                    headers: { 
                      'Authorization': `Bearer ${token}`
                    }
                  };
                  axios(config)
                  .then(function (response) {
                    dataUser(response.data[0].firstName, response.data[0].lastName);
                    dispatch(loginUserSuccessfully());
                  })
                  .catch(function (error) {
                    dispatch(loginUserError(true))
                  });
              })
              .catch(function (error){
                dispatch(loginUserError(true))
              });
        } catch (error) {
            dispatch(loginUserError(true))
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