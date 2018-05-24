import React from 'react'
import {Col, Row} from 'react-bootstrap'
import {compose, withProps, lifecycle, withHandlers} from 'recompose'
import {withScriptjs, withGoogleMap, GoogleMap, Marker} from 'react-google-maps'
import {MarkerClusterer} from 'react-google-maps/lib/components/addons/MarkerClusterer'
import apiKey from '../apiKey.json'
import Search from './Search'

const googleMapURL = 'https://maps.googleapis.com/maps/api/js?key=' + apiKey.googleMapsApi + '&v=3.exp&libraries=geometry,drawing,places'

const MapComponent = compose(
  withProps({
    googleMapURL: googleMapURL,
    loadingElement: <div style={{height: `100%`, width: `50%`, position: `absolute`, top: 0, left: 0}}/>,
    containerElement: <div style={{height: `71vh`}}/>,
    mapElement: <div className="col-lg-6" style={{height: `100%`}}/>,
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
      const {data} = this.props

      this.setState({
        zoomToMarkers: map => {
          const bounds = new window.google.maps.LatLngBounds()

          for (let i = 0; i < data.length; i++) {
            const loc = new window.google.maps.LatLng(data[i].coordinates)
            bounds.extend(loc)
          }

          map.fitBounds(bounds)

        },

        distanceMatrixService: () => {
          return new window.google.maps.DistanceMatrixService()
        }

      })
    }
  }),
  withScriptjs,
  withGoogleMap
)(props => {
    if (props.data.length > 1) {

      return (

        <Row>
            <GoogleMap
              ref={props.zoomToMarkers}
              defaultZoom={8}
              defaultCenter={{lat: 29.7368233, lng: -95.513883}}>
              <MarkerClusterer
                onClick={props.onMarkerClustererClick}
                averageCenter
                enableRetinaIcons
                gridSize={15}
              >
                {props.data.map(marker => (
                  <Marker
                    key={marker.label}
                    position={marker.coordinates}
                    label={marker.label}
                    onClick={e => window.open('https://www.google.com/maps/dir/?api=1&destination=' + marker.coordinates.lat + ',' + marker.coordinates.lng, '_blank')}
                  />
                ))}
              </MarkerClusterer>
            </GoogleMap>

          <Search data={props.data} distanceMatrixService={props.distanceMatrixService}/>

        </Row>
      )

    } else {

      return (
        <Row>

            <GoogleMap
              defaultZoom={13}
              defaultCenter={props.data[0].coordinates}>
              <Marker
                position={props.data[0].coordinates}
                label={props.data[0].label}
                onClick={e => window.open('https://www.google.com/maps/dir/?api=1&destination=' + props.data[0].coordinates.lat + ',' + props.data[0].coordinates.lng, '_blank')}
              />
            </GoogleMap>

          <Search data={props.data} distanceMatrixService={props.distanceMatrixService}/>

        </Row>
      )
    }
  }
)

const Map = (props) => {

  return (

    <MapComponent data={props.data}/>

  )
}

export default Map