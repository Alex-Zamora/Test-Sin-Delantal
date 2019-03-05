import React, { Component } from 'react';

export default class Map extends Component {

    state = {
      restaurants: []
    }

  // 19.411627, -99.177252 Tacos Arabe
  // 19.424245, -99.112194 Pescadito
  // 19.422634, -99.176225 Fishers

  componentDidMount() {
    console.log('Component Did Mount Map');
    this.getAllRestaurants();
  }

  componentDidUpdate(prevProps) {
    if (this.props.reloadRestaurants !== prevProps.reloadRestaurants) {
      console.log('Component Did Update Map');
      this.getAllRestaurants();
    }
  }

  getAllMarkers = (restaurants) => {

    const map = new window.google.maps.Map(document.getElementById(this.props.id),
    this.props.options);

    const infowindow =  new window.google.maps.InfoWindow({});

    restaurants.map((item) => {
      let marker = {}
      return (
        marker = new window.google.maps.Marker({
        position: { lat: item.lat, lng: item.lng },
        map: map,
        title: item.name
      }),
      marker.addListener('click', () => {
        let html = `<b> ${item.name} </b> <br/> 
          Email: ${item.email} <br/> 
          Phone: ${item.phone}`;
        infowindow.setContent(html);
        infowindow.open(map, marker);
      })
      )
    })
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
        this.getAllMarkers(data.restaurants);
      })
    }
  }

  render() {
    return (
      <React.Fragment>
        <div style={{ width: '100%', height: '100%' }} id={this.props.id}>
        </div>
      </React.Fragment>
    )
  }
}
