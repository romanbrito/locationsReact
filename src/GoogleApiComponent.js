import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import api from './apiKey.json'

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

    console.log(api.googleMapsApi)
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key:api.googleMapsApi }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
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