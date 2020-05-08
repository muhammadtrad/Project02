import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';

//Passed in through parent component or from mapStateToProps
//Directs user to component or home page depending on user login state
const Auth = ({ component: Component, path, loggedIn, exact }) => (
    <Route path={path} exact={exact} render={ (props) => (
        !loggedIn ? (
            <Component {...props} />
        ) : (
            <Redirect to="/home" /> 
        )
    )} />
);

//Redirect user to login page if not logged in
const Protected = ({ component: Component, loggedIn, ...rest }) => (
    <Route 
        {...rest}
        render= {props =>
            loggedIn ? (
                <Component {...props} />
            ) : (
                <Redirect to="/login" />
            )
            }
        />
);

const mapStateToProps = state => (
    {loggedIn: state.session.isAuthenticated}
);

export const AuthRoute = withRouter(connect(mapStateToProps)(Auth));

export const ProtectedRoute = withRouter(connect(mapStateToProps)(Protected));
