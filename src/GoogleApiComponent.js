import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { fitBounds } from 'google-map-react/utils'
import apiKey from './apiKey.json'

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 30.276153,
      lng: -97.741885
    },
    zoom: 11
  };

  render() {

    const bounds = {
      nw: {
        lat: 50.01038826014866,
        lng: -118.6525866875
      },
      se: {
        lat: 32.698335045970396,
        lng: -92.0217273125
      }
    };

// Or

    // const bounds = {
    //   ne: {
    //     lat: 50.01038826014866,
    //     lng: -118.6525866875
    //   },
    //   sw: {
    //     lat: 32.698335045970396,
    //     lng: -92.0217273125
    //   }
    // };

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
          defaultZoom={zoom}
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