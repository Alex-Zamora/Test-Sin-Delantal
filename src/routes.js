import React from 'react';
import { Route, Switch } from 'react-router-dom';

// Components
import Login from './components/Login/Login';
import RestaurantsList from './components/RestaurantsList/RestaurantsList';
import NotFound from './components/NotFound/NotFound';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

const Routes = ({ component: Component, ...rest }) => {
  return (
    <Switch>
      <PrivateRoute exact path='/restaurants' component={RestaurantsList} />
      <Route exact path="/" component={Login} />
      <Route path='*' component={NotFound} />
    </Switch>
  )
}

export default Routes;