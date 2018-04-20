import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { fitBounds } from 'google-map-react/utils'
import apiKey from './apiKey.json'
import data from './json/locations.json'

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class SimpleMap extends Component {
  // static defaultProps = {
  //   center: {
  //     lat: 30.276153,
  //     lng: -97.741885
  //   },
  //   zoom: 11
  // };

  // "lat": 35.46395,
  // "lng": -97.510094

  // "lat": 26.194533,
  // "lng": -98.205324



  render() {

    // const bounds = {
    //   nw: {
    //     lat: 50.01038826014866,
    //     lng: -118.6525866875
    //   },
    //   se: {
    //     lat: 26.194533,
    //     lng: -98.205324
    //   }
    // };

// Or

    const maxLat = data.locations.reduce((prev, current) => (prev.coordinates.lat > current.coordinates.lat) ? prev : current)
    const maxLng = data.locations.reduce((prev, current) => (prev.coordinates.lng > current.coordinates.lng) ? prev : current)
    const minLat = data.locations.reduce((prev, current) => (prev.coordinates.lat < current.coordinates.lat) ? prev : current)
    const minLng = data.locations.reduce((prev, current) => (prev.coordinates.lng < current.coordinates.lng) ? prev : current)

    const bounds = {
      ne: {
        lat: maxLat.coordinates.lat,
        lng: maxLng.coordinates.lng
      },
      sw: {
        lat: minLat.coordinates.lat,
        lng: minLng.coordinates.lng
      }
    };

    const size = {
      width: 640, // Map width in pixels
      height: 380, // Map height in pixels
    };

    const {center, zoom} = fitBounds(bounds, size);

    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key:apiKey.googleMapsApi }}
          // defaultCenter={this.props.center}
          // defaultZoom={this.props.zoom}
          defaultCenter={center}
          defaultZoom={zoom + 1}
        >
          <AnyReactComponent
            lat={30.276153}
            lng={-97.741885}
            text={'Downtown'}
          />
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;