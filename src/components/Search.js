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
    const destinations = locations.map(location => location.coordinates)
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

          {this.state.currentPosition && this._distanceMatrix([this.state.currentPosition], destinations)}

        </section>


        <article>
          <ul>
            {
              locations.filter(location =>
                location.name.search(reExp) !== -1 ||
                location.address.search(reExp) !== -1 ||
                location.zip.search(reExp) !== -1 ||
                location.state.search(reExp) !== -1 ||
                location.city.search(reExp) !== -1
              )
                .map(list => <li key={list.label}>{list.name}</li>)}
          </ul>
        </article>

      </div>
    )
  }

  _distanceMatrix = (origins, destinations) => {

    googleMapsClient.distanceMatrix({
      origins: origins,
      destinations: destinations,
      mode: 'driving',
      units: 'imperial',
    }, (err, res) => {
      if (res) {
        console.log(res)
      } else {
        console.log('there was an error')
      }
    })
  }

}

export default Search