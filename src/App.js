import React, {Component} from 'react'
import {Grid, Row} from 'react-bootstrap'
import Search from './components/Search'
import Map from './components/Map'

class App extends Component {

  render() {

    return (
      <div className="App">
        <Grid fluid>
          <Row>
          <Map/>
          <Search/>
          </Row>
        </Grid>
      </div>
    )
  }
}

export default App