import * as APIUtil from '../util/session_api_util.js';

import jwt_decode from 'jwt-decode';

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";
export const RECEIVE_USER_LOGOUT = "RECEIVE_USER_LOGOUT";
export const RECEIVE_USER_SIGN_IN = "RECEIVE_USER_SIGN_IN";


//This will dispatch when the user signs in
export const receiveCurrentUser = currentUser => ({
    type: RECEIVE_CURRENT_USER,
    currentUser
});

//This will be used to redirect the user to the login page upon signup
export const receiveUserSignIn = () => ({
    type: RECEIVE_USER_SIGN_IN
});

//This will dispatch to show authentication errors on the frontend
export const receiveErrors = errors => ({
    type: RECEIVE_SESSION_ERRORS,
    errors
});

//This will dispatch when the user logs out to set isAuthenticated to false
export const logoutUser = () => ({
    type: RECEIVE_USER_LOGOUT
});

//When the user signs up, dispatch the action corresponding to response from the backend
export const signup = user => dispatch => (
    APIUtil.signup(user).then(() => (
        dispatch(receiveUserSignIn())
    ), err => (
        dispatch(receiveErrors(err.response.data))
    ))
);

//When the user logs in, we will set the session token, dispatch the current user or any errors upon failure 
export const login = user => dispatch => (
    APIUtil.login(user).then( res => {
        const { token } = res.data;
        localStorage.setItem('jwtToken', token);
        APIUtil.setAuthToken(token);
        const decoded = jwt_decode(token);
        dispatch(receiveCurrentUser(decoded));
    })
     .catch(err => {
         dispatch(receiveErrors(err.response.data));
     })
);

//When the user logs out, remove the session token and dispatch the logoutUser action
export const logout = () => dispatch => {
    //remove the token from the local storage
    //localStorage.removeItem('jwtToken');
    localStorage.clear();
    //delete the common header sent via axios
    APIUtil.setAuthToken(false);
    dispatch(logoutUser);

};