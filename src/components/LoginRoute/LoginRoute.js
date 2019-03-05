import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const LoginRoute = ({ component: Component, ...rest }) => {

  return (
    <Route {...rest} render={ props => (
      localStorage.getItem('currentUser')
        ? <Redirect to={{ pathname: '/dashboard', state: { from: props.location } }} />
        : <Component {...props} />
    )}/>
  )
}

export default LoginRoute;