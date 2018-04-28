import React, {Component} from 'react'
import {Grid, Row} from 'react-bootstrap'
import data from '../json/locations.json'
import Search from './Search'
import Map from './Map'

class Locations extends Component {

  render() {

    console.log(this.props.match.params.location)

    return (
      <div className="App">
        <Grid fluid>
          <Row>
            <Map data={data}/>
            <Search data={data}/>
          </Row>
        </Grid>
      </div>
    )
  }
}

export default Locations