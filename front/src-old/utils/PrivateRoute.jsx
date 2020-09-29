import React from 'react';
import { Redirect, Route } from 'react-router-dom';

// "Organization";
// "Trainer";
// "User";

export const PrivateRoute = ({ component: Component, user, ...rest }) => (

  <Route
    {...rest}
    render={(props) => {
      // if(user === null) {
      //     // if user logouted
      //     return <Redirect to={{pathname: '/login', state: {from: props.location}}} />
      // } else {

      // if user logged in
      switch (props.location.pathname.split('/')[1]) {
        case 'User':
          if (user.role === 'Organization') return <Redirect to="/admin" />;
          return <Component {...props} />;

        default:
          return <Component {...props} />;
      }
      // }
    }}
  />

);
