import React from 'react';
import { Redirect, Route } from "react-router-dom";

export const Role = {
    Admin: 'Admin',
    Trainer: 'Trainer',
    Owner: 'Owner',
    User: 'User'    
}

export const PrivateRoute = ({component: Component, roles, ...rest}) => (
    
    <Route {...rest} render={props => {

        const currentUser = JSON.parse((localStorage.getItem('user')));
        if(currentUser === null) {
            // not logged in so redirect to login page with the return url
            return <Redirect to={{pathname: '/login', state: {from: props.location}}} />
        }
        // check if route is restricted by role
        if (roles && roles.indexOf(currentUser.role) === -1) {
            // role not authorised so redirect to home page
            console.log('lol')
            return <Redirect to={{ pathname: '/'}} />
        }
        // authorised so return component
        return <Component {...props} />
    }} />
)