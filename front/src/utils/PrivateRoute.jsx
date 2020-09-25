import React from 'react';
import { Redirect, Route } from "react-router-dom";

export const Role = {
    Admin: 'Admin',
    Trainer: 'Trainer',
    Ownerr: 'Owner',
    User: 'User'    
}

export const PrivateRoute = ({component: Component, roles, ...rest}) => (
    
    <Route {...rest} render={props => {

        const currentUser = localStorage.getItem('user');
        if(currentUser === null) {
            // not logged in so redirect to login page with the return url
            return <Redirect to={{pathname: '/login', state: {from: props.location}}} />
        }

        // check if route is restricted by role
        if (roles && roles.indexOf(currentUser.role) === -1) {
            // role not authorised so redirect to home page
            return <Redirect to={{ pathname: '/'}} />
        }

            // if user logged in
            switch(props.location.pathname.split('/')[1]) {
                case "User":
                    if(currentUser.role === 'Organization')
                        return <Redirect to="/admin" />
                    return <Component {...props} />

                default:
                    return <Component {...props} />
            }
        // }
    }} />
)