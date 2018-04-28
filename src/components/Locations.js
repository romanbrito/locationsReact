import React, {Component} from 'react'
import {Grid, Row} from 'react-bootstrap'
import Search from './Search'
import Map from './Map'

class Locations extends Component {

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

export default Locations