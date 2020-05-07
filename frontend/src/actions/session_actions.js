import * as APIUtil from '../util/session_api_util.js';

import jwt_decode from 'jwt-decode';

export const RECEIVE_USER_LOGOUT = "RECEIVE_USER_LOGOUT";

export const logoutUser = () => ({
    type: RECEIVE_USER_LOGOUT
});

export const logout = () => dispatch => {
    //remove the token from the local storage
    localStorage.removeItem('jwtToken');

    //delete the common header sent via axios
    APIUtil.setAuthToken(false);
    
    dispatch(logoutUser);
}