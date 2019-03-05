import React, { Component } from 'react';
import { toast } from 'react-toastify';

// Styles
import './Dashboard.sass';

// Components
import Header from '../Header/Header';
import CreateRestaurant from '../CreateRestaurant/CreateRestaurant';
import ListRestaurants from '../ListRestaurants/ListRestaurants';
import Map from '../Map/Map';

export default class Dashboard extends Component {

  state = {
    createRestaurantVisible: false,
    reloadRestaurants: false
  }

  handleOpenRegister = () => {
    this.setState({
      createRestaurantVisible: !this.state.createRestaurantVisible
    })
  }

  handleCloseRegister = () => {
    this.setState({
      createRestaurantVisible: false
    });
  };

  handleReloadRestaurants = () => {
    this.setState({
      reloadRestaurants: !this.state.reloadRestaurants
    })
  }

  restaurants = (restaurants) => {
    this.setState({
      restaurants: restaurants
    })
  }

  // Logout
  logout = () => {
    localStorage.removeItem('currentUser');
    toast.success('Successful Logout');
  }

  render() {
    return (
      <div className='wrapper-dashboard'>
        <div className="left">
          <Header 
            handleOpenRegister={this.handleOpenRegister} 
            logout={this.logout}
          />
          { 
            this.state.createRestaurantVisible && 
            <CreateRestaurant
              handleCloseRegister={this.handleCloseRegister}
              handleReloadRestaurants={this.handleReloadRestaurants}
              visible={this.state.createRestaurantVisible}
            />
          }
          <ListRestaurants 
            reloadRestaurants={this.state.reloadRestaurants}
            handleReloadRestaurants={this.handleReloadRestaurants} 
            restaurants={this.restaurants}
          />
        </div>
        <div className="right">
          <Map
          id="myMap"
          options={{
            center: { lat: 19.4335327, lng: -99.1498969 },
            zoom: 12,
            fullscreenControl: false,
            mapTypeControl: false
          }}
          reloadRestaurants={this.state.reloadRestaurants} 
          >
          </Map>
        </div>
      </div>
    )
  }
}
