import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';
import {fitBounds} from 'google-map-react/utils'
import apiKey from './apiKey.json'
import data from './json/locations.json'
import pin from './google-maps-icon-blank-hi.png'


// const AnyReactComponent = ({text}) => <h1>{text}</h1>;
const  AnyReactComponent = () => <img src="http://maps.gstatic.com/mapfiles/ridefinder-images/mm_20_red.png" alt=""/>
// https://sites.google.com/site/gmapsdevelopment/
class SimpleMap extends Component {

  render() {

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
      <div style={{height: '100vh', width: '100%'}}>
        <GoogleMapReact
          bootstrapURLKeys={{key: apiKey.googleMapsApi}}
          defaultCenter={center}
          defaultZoom={ zoom + 1}
        >

          {
            data["locations"].map(location =>
              <AnyReactComponent
                key={location.label}
                lat={location.coordinates.lat}
                lng={location.coordinates.lng}
                text={location.label}
              />)
          }

        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;