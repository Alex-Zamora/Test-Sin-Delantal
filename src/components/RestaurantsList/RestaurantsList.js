import React, { Component } from 'react';
import { toast } from 'react-toastify';

// Styles
import './RestaurantsList.sass';

// Components
import Restaurant from '../Restaurant/Restaurant';
import Map from '../Map/Map';
// import InfoMarker from '../Map/InfoMarker';

export default class RestaurantList extends Component {

  state = {
    restaurants: [],
    name: '',
    email: '',
    isActive: false,
    phone: '',
    lat: null,
    lng: null,
    registerVisible: false
  }

  componentDidMount() {
    this.getAllRestaurants();
  }

  getAllRestaurants = () => {
    let user = JSON.parse(localStorage.getItem('currentUser'));

    if (user.success && user.token) {
      fetch('http://34.215.170.251/restaurants', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + user.token
        }
      })
      .catch(err => console.log(`Error ${err}`))
      .then(res => res.json())
      .then(data => {
        this.setState({
          restaurants: data.restaurants
        })
      })
    } else {
      return toast.error('Token not valid or don´t exists');
    }
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
    e.preventDefault();
    const target = e.currentTarget;
    this.setState({ submited: true })

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
          this.setState({
            name: '',
            email: '',
            isActive: false,
            phone: '',
            lat: null,
            lng: null
           });
          this.getAllRestaurants();
          // Reset submited
          this.setState({ submited: false })
          // Reset form
          target.reset();
        } else {
          console.log(data);
          data.errors.map(err => {
            return toast.error(err);
          })
        }
      })
    } else {
      return toast.error('Token not valid or don´t exists');
    }
  }

  handleDeleteRestaurant = (id) => {
    let user = JSON.parse(localStorage.getItem('currentUser'));

    if (window.confirm("Are you sure you want deleted it?")) {
      fetch(`http://34.215.170.251/restaurants/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + user.token
        }
      })
      .catch(err => console.log(`Error ${err}`))
      .then(res => res.json())
      .then(data => {
        toast.success('Restaurant deleted with success')
        this.getAllRestaurants();
      })
    }
  }

  handleOpenRegister = () => {
    this.setState({
      registerVisible: !this.state.registerVisible
    })
  }

  handleCloseRegister = event => {
    this.setState({
      registerVisible: false
    });
  };

  render() {
    const { submited, name, email, lat, lng, phone, restaurants } = this.state;

    return (
      <div className='wrapper-restaurants-list'>
        <div className='left'>
          <div className="top-bar">
            <h1>Restaurant App</h1>
            <div className="buttons">
              <div className="create" onClick={this.handleOpenRegister}>
                Restaurant Register
              </div>
              <div className="logout">
                Logout
              </div>
            </div>
          </div>
          {
            this.state.registerVisible && (
              <div className='create-restaurant'>
              <div className="close">
                <i className="fas fa-times" onClick={this.handleCloseRegister}></i>
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
                  <input 
                    type="number"
                    step="any"
                    className={`form-control ${submited && !lat ? ' is-invalid' : '' }`} 
                    placeholder='latitud'
                    onChange={this.handleChange('lat')}
                  />
                  <input 
                    type="number" 
                    step="any"
                    className={`form-control ${submited && !lng ? ' is-invalid' : '' }`} 
                    placeholder='longitud'
                    onChange={this.handleChange('lng')}
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
  
                <button className='btn btn-action'>Create Restaurant</button>
              </form>
            </div>
            )
          }

          <div className="restaurants-list">
            {
              this.state.restaurants.map((restaurant, key) => {
                return <Restaurant
                  key={key} 
                  restaurant={restaurant}
                  handleDeleteRestaurant={this.handleDeleteRestaurant}
                  />
              })
            }
          </div>
        </div>
        <div className="right">
          <Map
            id="myMap"
            options={{
              center: { lat: 19.4335327, lng: -99.1498969 },
              zoom: 12
            }}
            restaurants={restaurants}
            >
            {/* {
              restaurants.map(item => {
                <p>{item.name}</p>
              })
            } */}
            
          </Map>
        </div>
      </div>
    )
  }
}
