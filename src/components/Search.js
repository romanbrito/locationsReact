import React, {Component} from 'react'
import data from '../json/locations'

class Search extends Component {
  state = {
    search: '',
    currentPosition: null,
  }

  componentWillMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition( position => console.log(position.coords),
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
}

export default Search