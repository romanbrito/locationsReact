import React, {Component} from 'react'
import {Grid} from 'react-bootstrap'
import Search from './components/Search'
import Map from './components/Map'

class App extends Component {

  render() {

    return (
      <div className="App">
        <Grid>
          <Map/>
          <Search/>
        </Grid>
      </div>
    )
  }
}

export default App