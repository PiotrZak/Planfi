import React, { useState, useEffect } from 'react';
import { Redirect, Route } from "react-router-dom";

// "Organization";
// "Trainer";
// "User";

export const PrivateRoute = ({component: Component, userData, ...rest}) => (
    <Route {...rest} render={props => {
        if(userData === null) {
            // if user logouted
            return <Redirect to={{pathname: '/', state: {from: props.location}}} />
        } else {

            // if user logged in
            switch(props.location.pathname.split('/')[1]) {
                case "User":
                    if(userData.role === 'Organization')
                        return <Redirect to="/admin" />
                    return <Component {...props} />

                default:
                    return <Component {...props} />
            }
        }
    }} />
)