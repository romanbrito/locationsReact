import React, {Component} from 'react'
import apiKey from '../apiKey.json'
import './Search.css'
import {Grid, Col, Row} from 'react-bootstrap'
import Menus from './Menus'

const googleMapsClient = require('@google/maps').createClient({
  key: apiKey.googleMapsApi
})

class Search extends Component {
  state = {
    search: '',
    currentPosition: null,
    locations: this.props.data,
    isGeoSorted: false
  }

  componentWillMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position =>
          this.setState({currentPosition: {lat: position.coords.latitude, lng: position.coords.longitude}}),
        () => console.log('error'))
    }
  }

  render() {

    const locations = this.props.data
    const reExp = new RegExp(this.state.search, "i")

    return (

      <Col lg={6}>
        <Row id="search-area">
          <input
            type="search"
            className="input-search"
            name="search"
            placeholder="Name, City, State"
            value={this.state.search}
            onChange={(e) => this.setState({search: e.target.value})}
          />
        </Row>

        {this.state.currentPosition && !this.state.isGeoSorted && this._distanceMatrix([this.state.currentPosition], locations)}

        <Grid fluid>
          <div id="update" className="search-location">

            <ul className="searchresults">
              {
                this.state.locations.filter(location =>
                  location.name.search(reExp) !== -1 ||
                  location.address.search(reExp) !== -1 ||
                  location.zip.search(reExp) !== -1 ||
                  location.state.search(reExp) !== -1 ||
                  location.city.search(reExp) !== -1
                )
                  .map(list =>

                    <li key={list.label}>
                      <Grid fluid>
                        <Col lg={6}>
                          <h4>{list.name}</h4>
                          <p>{list.address}</p>
                          <p>{list.city} {list.state} {list.zip} </p>
                          <a href="tel: + {list.phone}"> T. {list.phone}</a>
                          <p>{list.hours1}</p>
                          <p>{list.hours2}</p>
                          <p>{list.hours3}</p>
                          {list.miles && <p>Distance: {list.miles} miles</p>}
                        </Col>

                        <Menus
                          list={list}/>


                      </Grid>
                    </li>
                  )}
            </ul>
          </div>
        </Grid>
      </Col>

    )
  }

  _distanceMatrix = (origins, locations) => {
    const destinations = locations.map(location => location.coordinates)

    googleMapsClient.distanceMatrix({
      origins: origins,
      destinations: destinations,
      mode: 'driving',
      units: 'imperial',
    }, (err, res) => {
      if (res) {
        const distance = res.json.rows[0].elements

        // merging distance with locations array
        const location_distance = distance.map(function (element, index) {
          locations[index].distance = element.distance.value;
          locations[index].miles = element.distance.text;
          return locations[index];
        }).sort(function (a, b) {  // sorting locations array
          return a.distance - b.distance;
        })

        this.setState({locations: location_distance, isGeoSorted: true})

      } else {
        console.log('Geo Location error')
      }
    })
  }

}

export default Search