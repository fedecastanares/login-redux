import axios from 'axios';
import {
    SIGNUP_USER,
    SIGNUP_USERS_SUCCESSFULLY,
    SIGNUP_USERS_ERROR,
    HIDE_ALERT

} from '../types';


import {authenticateUser, dataUser} from '../components/auth';

export function signupUserAction(user) {
    return (dispatch) => {
        dispatch(signupUser());
        try {
            axios.post(`http://${process.env.REACT_APP_BASE_URL}:${process.env.REACT_APP_PORT}/users`, {
              firstName: user.name,
              lastName: user.lastName,
              email: user.email,
              password: user.password,
            })
            .then(function (response) {
              if (response.statusText === "Created"){
                authenticateUser(response.data.accessToken);
                dataUser(user.name, user.lastName);
                dispatch(hideAlert());
                dispatch(signupUserSuccessfully());
              }
            })
            .catch(function (error) {
                dispatch(signupUserError({type: 'error', msg: 'email has been created'}))
            });
        } catch (error) {
            dispatch(signupUserError({type: 'error', msg: 'Server not respond'}))
        } 
}}

export function showAlert(alert) {
    return (dispatch) => {
        dispatch(signupUserError(alert))
    }
}


const signupUser = () => ({
    type: SIGNUP_USER,
})

const signupUserSuccessfully = () => ({
    type: SIGNUP_USERS_SUCCESSFULLY,
    payload: true
})

const signupUserError = (error) => ({
    type: SIGNUP_USERS_ERROR,
    payload: error,
})

const hideAlert = () => ({
    type: HIDE_ALERT,
    payload: false
})