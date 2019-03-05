import React, { Component } from 'react';
import { toast } from 'react-toastify';

// Styles
import './CreateRestaurant.sass';

// Components
import LocationMap from '../LocationMap/LocationMap';

export default class CreateRestaurant extends Component {
  _isMounted = false;

  state = {
    name: '',
    email: '',
    isActive: false,
    phone: '',
    lat: null,
    lng: null,
  }

  handleChange = input => event => {
    this.setState({
      [input]: event.target.value
    })
  }

  // ref for read the input value
  isActiveRef = React.createRef();

  handleClickActive = () => {
    this.setState({
      isActive: this.isActiveRef.current.checked
    })
  }

  handleCreateRestaurant = (e) => {
    this._isMounted = true;
    
    e.preventDefault();
    const target = e.currentTarget;
    this.setState({ submited: true });

    let user = JSON.parse(localStorage.getItem('currentUser'));
    const { name, email, lat, lng, phone, isActive } = this.state;

    let restaurant = {
      name,
      email,
      lng: parseFloat(lng),
      lat: parseFloat(lat),
      phone,
      isActive
    }

    if ( user.success && user.token ) {
      fetch('http://34.215.170.251/restaurants', {
        method: 'POST',
        body: JSON.stringify(restaurant),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + user.token
        }
      })
      .catch(err => console.log(`Error ${err}`))
      .then(res => res.json())
      .then((data) => {
        if (data.success) {
          toast.success('Restaurant add with success!');
          if (this._isMounted) {
            this.setState({
              name: '',
              email: '',
              isActive: false,
              phone: '',
              lat: null,
              lng: null
            });
            // Reset submited
            this.setState({ submited: false })
          }
          // Reload List Restaurants
          this.props.handleReloadRestaurants();
          // Close Form Register
          this.props.handleCloseRegister();
          // Reset form
          target.reset();
        } else {
          data.errors.map(err => {
            return toast.error(err);
          })
        }
      })
    } else {
      return toast.error('Token not valid or don´t exists');
    }
  }

  location = (lat, lng) => {
    this.setState({
      lat,
      lng
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { submited, name, email, lat, lng, phone } = this.state;
    return (
      <div className='create-restaurant'>
        <div className="close">
          <p>New Restaurant</p>
          <i className="fas fa-times"
            onClick={this.props.handleCloseRegister}
          ></i>
        </div>
        <form onSubmit={this.handleCreateRestaurant}>
          <div className="row">
            <input
              type='text' 
              className={`form-control ${submited && !name ? ' is-invalid' : '' }`}
              placeholder='Name'
              onChange={this.handleChange('name')}
            />
            <input 
              type='text' 
              className={`form-control ${submited && !email ? ' is-invalid' : '' }`} 
              placeholder='Email'
              onChange={this.handleChange('email')}
            />
          </div>

          <div className="row">
            <div className="form-group">
              <label htmlFor="isActive">Active</label>
              <input
                type="checkbox"
                ref={this.isActiveRef}
                onClick={this.handleClickActive}
              />
            </div>
            <input 
              type='text' 
              className={`form-control ${submited && !phone ? ' is-invalid' : '' }`} 
              placeholder='Phone'
              onChange={this.handleChange('phone')}
            />
          </div>

          <LocationMap 
            location={this.location}
            submited={this.state.submited}
            lat={lat}
            lng={lng}
          />

          <button className='btn btn-action'>Create Restaurant</button>
        </form>
      </div>
    )
  }
}
