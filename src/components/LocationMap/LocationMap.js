import React, { Component } from 'react';

// Styles
import './LocationMap.sass';

export default class LocationMap extends Component {

  state = {
    lat: null,
    lng: null,
    submited: false
  }

  componentDidMount() {
    this.getLatLng();
  }

  getLatLng = () => {
    let map = new window.google.maps.Map(document.getElementById('map-create'), {
      center: {lat: 19.4296475, lng: -99.1402839},
      zoom: 13,
      mapTypeId: 'roadmap',
      disableDefaultUI: true
      // fullscreenControl: false,
      // mapTypeControl: false
    });

    // initialize the autocomplete functionality using the #pac-input input box
    let inputNode = document.getElementById('pac-input');
    let autoComplete = new window.google.maps.places.Autocomplete(inputNode);

    // Instance marker
    var marker = new window.google.maps.Marker({map: map});

    autoComplete.addListener('place_changed', () => {

      let place = autoComplete.getPlace();
      let location = place.geometry.location;
      let lat = place.geometry.location.lat();
      let lng = place.geometry.location.lng();

      this.props.location(lat, lng);

      // bring the selected place in view on the map
      map.fitBounds(place.geometry.viewport);
      map.setCenter(location);

      marker.setPlace({
        placeId: place.place_id,
        location: location,
      });
    });
  }

  render() {
    const { lat, lng, submited } = this.props;
    return (
      <React.Fragment>
        <div id='pac-container'>
          <input 
            id='pac-input' 
            className={`form-control ${!lng && !lat && submited ? ' is-invalid' : '' }`}
            type='text' 
            placeholder='Enter an adress' />
        </div>

        <div id="map-create"></div>

      </React.Fragment>
    )
  }
}
