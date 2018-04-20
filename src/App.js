import React, { Component } from 'react';
import './App.css';
import data from './json/locations.json'
import Map from './GoogleApiComponent'

class App extends Component {

  state = {
    search: '',
  }

  render() {

    const locations = data.locations
    const reExp = new RegExp(this.state.search, "i")

    return (
      <div className="App">
        <header>

        </header>

        <section>

          <Map/>

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
    );
  }
}

export default App;