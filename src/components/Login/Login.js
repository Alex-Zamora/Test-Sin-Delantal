import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

// Styles
import './Login.sass';

class Login extends Component {

  state = {
    email: '',
    password: '',
    error: ''
  }

  handleLogin = (e) => {
    e.preventDefault();
    this.setState({ submitted: true });
    const { email, password } = this.state;

    // stop here if form is invalid
    if (!(email && password)) {
      return;
    }

    // Obj user
    const user = {
      email,
      password
    }

    fetch('http://34.215.170.251/auth/login', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {'Content-Type': 'application/json'}
    })
    .then(res => res.json())
    .then(data => {
      // Login successful
      if (data.success) {
        localStorage.setItem('currentUser', JSON.stringify(data));
        this.setState({
          error: null
        });
        toast.success('Successful Login');
        this.props.history.push('/dashboard');
      } else {
        this.setState({
          error: data.message
        });
        toast.error(data.message);
      }
    })
    .catch(err => console.log(`Error ${err}`));
  }

  handleChange = input => event => {
    this.setState({
      [input]: event.target.value
    })
  }

  render() {
    const { email, password, error, submitted } = this.state;
    return (
      <div className='wrapper-login'>
        <form className="login" onSubmit={this.handleLogin}>
          <div className="title">
            <h3>Login</h3>
            <p>Welcome to the Restaurant App.</p>
          </div>
          <input
            className={`form-control  
              ${(submitted && !email) || error 
                ? ' is-invalid' 
                : ''}`}
            type='email'
            placeholder='Email'
            onChange={this.handleChange('email')}
          />
          {
            submitted && !email &&
            <div className="is-required">Email is required</div>
          }
          {
            error && email &&
              <div className="is-required">Check your email</div>
          }
          <input
            className={`form-control  
              ${(submitted && !password) || error 
                ? ' is-invalid' 
                : ''}`}
            type='password' 
            placeholder='Password'
            onChange={this.handleChange('password')}
          />
          {
            submitted && !password &&
            <div className="is-required">Password is required</div>
          }
          {
            error && password &&
              <div className="is-required">Check your password</div>
          }
          <button className='btn btn-login' type='submit'>Login</button>
        </form>
        <Link to='/register' className='link'>
          Don't have an account? - Sign UP
        </Link>
        {/* {
          error &&
          <div className="alert" role="alert">
            {this.state.error}
          </div>
        } */}
      </div>
    )
  }
}

export default Login;