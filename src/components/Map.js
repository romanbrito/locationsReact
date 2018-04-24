import React, {Component} from 'react'
import {Col} from 'react-bootstrap'
import {compose, withProps, lifecycle, withHandlers} from 'recompose'
import {withScriptjs, withGoogleMap, GoogleMap, Marker} from 'react-google-maps'
import {MarkerClusterer} from 'react-google-maps/lib/components/addons/MarkerClusterer'
import data from '../json/locations.json'
import apiKey from '../apiKey.json'

const googleMapURL = 'https://maps.googleapis.com/maps/api/js?key=' + apiKey.googleMapsApi + '&v=3.exp&libraries=geometry,drawing,places'

const MapComponent = compose(
  withProps({
    googleMapURL: googleMapURL,
    loadingElement: <div style={{height: `100%`}}/>,
    containerElement: <div style={{height: `400px`}}/>,
    mapElement: <div style={{height: `100%`}}/>,
  }),
  withHandlers({
    onMarkerClustererClick: () => (markerClusterer) => {
      const clickedMarkers = markerClusterer.getMarkers()
      console.log(`Current clicked markers length: ${clickedMarkers.length}`)
      console.log(clickedMarkers)
    },
  }),
  lifecycle({
    componentWillMount() {
      this.setState({
        zoomToMarkers: map => {
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

    <MarkerClusterer
      onClick={props.onMarkerClustererClick}
      averageCenter
      enableRetinaIcons
      gridSize={15}
    >

      {data.locations.map(marker => (
        <Marker
          key={marker.label}
          position={marker.coordinates}
          label={marker.label}
          onClick={e => window.open('https://www.google.com/maps/dir/?api=1&destination=' + marker.coordinates.lat + ',' + marker.coordinates.lng, '_blank')}
        />
      ))}
    </MarkerClusterer>

  </GoogleMap>
))

class Map extends Component {

  render() {

    return (
      <Col lg={6}>
        <MapComponent/>
      </Col>
    )
  }

}

export default Map