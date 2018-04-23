import React, {Component} from 'react'
import data from '../json/locations'
import apiKey from '../apiKey.json'

const googleMapsClient = require('@google/maps').createClient({
  key: apiKey.googleMapsApi
})

class Search extends Component {
  state = {
    search: '',
    currentPosition: null,
    locations: data.locations,
    isGeoSorted: false
  }

  componentWillMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition( position =>
          this.setState({currentPosition: {lat:position.coords.latitude, lng:position.coords.longitude}}),
        () => console.log('error'))
    }
  }

  render() {
    const locations = data.locations
    const reExp = new RegExp(this.state.search, "i")

    return (
      <div className="Search">
        <section>

          <input
            type="search"
            className="input-search"
            name="search"
            id="search"
            placeholder="Name, City, State"
            value={this.state.search}
            onChange={(e) => this.setState({search: e.target.value})}
          />

          <h1>latitude {this.state.currentPosition && this.state.currentPosition.lat} longitude {this.state.currentPosition && this.state.currentPosition.lng}</h1>

          {this.state.currentPosition && !this.state.isGeoSorted && this._distanceMatrix([this.state.currentPosition], locations)}

        </section>


        <article>
          <ul>
            {
              this.state.locations.filter(location =>
                location.name.search(reExp) !== -1 ||
                location.address.search(reExp) !== -1 ||
                location.zip.search(reExp) !== -1 ||
                location.state.search(reExp) !== -1 ||
                location.city.search(reExp) !== -1
              )
                .map(list => <li key={list.label}>{list.name} {this.state.isGeoSorted && list.miles}</li>)}
          </ul>
        </article>

      </div>
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
        console.log(res.json.rows[0].elements)
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