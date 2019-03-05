import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

// CSS
import './App.sass';

// Components
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Dashboard from './components/Dashboard/Dashboard';
import NotFound from './components/NotFound/NotFound';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Loginroute from './components/LoginRoute/LoginRoute';

class App extends Component {
  render() {
    return (
      <Router>
        <div className='container'>
        <Switch>
          <Loginroute exact path="/" component={Login} />
          <Route exact path="/register" component={Register} />
          <PrivateRoute exact path='/dashboard' component={Dashboard} />
          <Route path='*' component={NotFound} />
        </Switch>
        <ToastContainer />
        </div>
      </Router>
    );
  }
}

export default App;
