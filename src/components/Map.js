import React, {Component} from 'react'
import {compose, withProps, lifecycle} from 'recompose'
import {withScriptjs, withGoogleMap, GoogleMap, Marker} from 'react-google-maps'
import data from '../json/locations.json'

const MapComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDP1umTdbqfnYTGbUuaWtqBdcTE0TcDeHY&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{height: `100%`}}/>,
    containerElement: <div style={{height: `400px`}}/>,
    mapElement: <div style={{height: `100%`}}/>
  }),
  lifecycle({
    componentWillMount() {
      this.setState({
        zoomToMarkers: map => {
          //console.log('zoom to markers')
          const bounds = new window.google.maps.LatLngBounds()

          for (let i = 0; i < data.locations.length; i++) {
            const loc = new window.google.maps.LatLng(data.locations[i].coordinates)
            bounds.extend(loc)
          }

          map.fitBounds(bounds)
        }
      })
    }
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap
    ref={props.zoomToMarkers}
    defaultZoom={8}
    defaultCenter={{lat: -34.397, lng: 150.644}}>
    {props.isMarkerShown && (
      <Marker position={{lat: -34.397, lng: 150.644}}/>
    )}

    {data.locations.map(marker => (
      <Marker
        key={marker.label}
        position={marker.coordinates}
        label={marker.label}
      />
    ))}
  </GoogleMap>
))

class Map extends Component {

  render() {

    return (
      <MapComponent
        isMarkerShown
      />
    )
  }

}

export default Map