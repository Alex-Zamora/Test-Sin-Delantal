import React, { Component } from 'react';
import { toast } from 'react-toastify';

// Styles
import './ListRestaurants.sass';

// Components
import Restaurant from '../Restaurant/Restaurant';

export default class ListRestaurants extends Component {

  state = {
    restaurants: []
  }

  componentDidMount() {
    this.getAllRestaurants();
  }

  componentDidUpdate(prevProps) {
    if (this.props.reloadRestaurants !== prevProps.reloadRestaurants) {
      this.getAllRestaurants();
    }
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
        this.props.restaurants(data.restaurants);
        this.setState({
          restaurants: data.restaurants
        })
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
        // Reload List Restaurants
        this.props.handleReloadRestaurants();
      })
    }
  }

  render() {
    return (
      <React.Fragment>
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
    </React.Fragment>
    )
  }
}
