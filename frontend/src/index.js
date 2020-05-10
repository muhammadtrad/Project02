import React from 'react';
import ReactDOM from 'react-dom';

import Root from './components/root';
import configureStore from './store/store';

//to parse the user's session token
import jwt_decode from 'jwt-decode';

import { setAuthToken } from './util/session_api_util';

import { logout } from './actions/session_actions';

document.addEventListener('DOMContentLoaded', () => {
  let store;

  if (localStorage.jwtToken){
  //set the token as a common header for all axios requests
  setAuthToken(localStorage.jwtToken);
  //decode the token to obtain the user's information
  const decodedUser = jwt_decode(localStorage.jwtToken);

  //Create a preconfigured state we can add to the store
  const preloadedState = { session: { isAuthenticated: true, user: decodedUser}};

  store = configureStore(preloadedState);

  const currentTime = Date.now()/1000;

  //If the user's token has expired
  if (decodedUser.exp < currentTime){
    store.dispatch(logout());
    window.location.href = '/login';
    }

  } else {
    //If this is a first time user, start with an empty store
    store = configureStore({});
  }

  //Render the root component and pass it into the store as a prop
  const root = document.getElementById('root');

  ReactDOM.render(<Root store={store} />, root);
});