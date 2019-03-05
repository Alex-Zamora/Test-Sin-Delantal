import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

// Styles
import './Register.sass';

export default class Register extends Component {
  _isMounted = false;

  state = {
    name: '',
    paternalSurname: '',
    maternalSurname: '',
    email: '',
    password: '',
    error: ''
  }

  handleRegister = e => {
    this._isMounted = true;

    e.preventDefault();
    const target = e.currentTarget;

    this.setState({ submitted: true });

    const { name, paternalSurname, maternalSurname,
      email, password } = this.state;

    if ( !(name && paternalSurname && maternalSurname && email && password ) ){
      return;
    }

    const user = {
      name,
      paternalSurname,
      maternalSurname,
      email,
      password,
    }

    fetch('http://34.215.170.251/users', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'Application/json'
      }
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        toast.success('User registered with success!');

        if (this._isMounted) {
          // Reset state
          this.setState({
            name: '',
            paternalSurname: '',
            maternalSurname: '',
            email: '',
            password: '',
            error: '',
            submited: false
          });
        }
        // Reset form
        target.reset();
        // Redirect Login
        this.props.history.push('/');
      } else {
        console.log(data);
        data.errors.map(err => {
          if (err.includes('email')) {
            this.setState({
              emailError: true
            });
            return toast.error(err);
          }
          return toast.error(err);
        })
      }
    })
    .catch(err => console.log(`Error ${err}`));
  }

  handleChange = input => event => {
    this.setState({
      [input]: event.target.value
    })
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { name, paternalSurname, maternalSurname, 
      email, password, error, submitted, emailError } = this.state;
    return (
      <div className='wrapper-register'>
        <form className="register" onSubmit={this.handleRegister}>
          <div className="title">
            <h3>Sign Up</h3>
            <p>Welcome to the Restaurant App.</p>
          </div>
          <input
            className={`form-control  ${submitted && !name ? ' is-invalid' : ''}`}
            type='text'
            placeholder='Name'
            onChange={this.handleChange('name')}
          />
          {
            submitted && !name &&
            <div className="is-required">Name is required</div>
          }
          <input
            className={`form-control  ${submitted && !paternalSurname ? ' is-invalid' : ''}`}
            type='text'
            placeholder='Paternal Surname'
            onChange={this.handleChange('paternalSurname')}
          />
          {
            submitted && !paternalSurname &&
            <div className="is-required">Paternal Surname is required</div>
          }
          <input
            className={`form-control  ${submitted && !maternalSurname ? ' is-invalid' : ''}`}
            type='text'
            placeholder='Maternal Surname'
            onChange={this.handleChange('maternalSurname')}
          />
          {
            submitted && !maternalSurname &&
            <div className="is-required">Maternal Surname is required</div>
          }
          <input
            className={`form-control  ${(submitted && !email) || emailError ? ' is-invalid' : ''}`}
            type='email'
            placeholder='Email'
            onChange={this.handleChange('email')}
          />
          {
            submitted && !email &&
            <div className="is-required">Maternal Surname is required</div>
          }
          <input
            className={`form-control  ${submitted && !password ? ' is-invalid' : ''}`}
            type='password' 
            placeholder='Password'
            onChange={this.handleChange('password')}
          />
          {
            submitted && !password &&
            <div className="is-required">Password is required</div>
          }
          <button className='btn btn-login' type='submit'>
            Sign Up
          </button>
        </form>
        <Link to='/' className='link'>
          Already have an account? Log In
        </Link>
        {
          error &&
          <div className="alert" role="alert">
            {this.state.error}
          </div>
        }
      </div>
    )
  }
}
