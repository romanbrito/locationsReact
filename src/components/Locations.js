import React, {Component} from 'react'
import {Grid, Row} from 'react-bootstrap'
import data from '../json/locations.json'
import Map from './Map'

const arrayToObject  = (array) => {

  return array.reduce( (obj, item) => {
    obj[item.id] = item
    return obj
  }, {})

}

const dataObj = arrayToObject(data.locations)

class Locations extends Component {

  render() {
    // should work too if url is locations-menu
    const loc = this.props.match.params.location

    return (
      <div className="App">
        <Grid fluid>
          <Row>
            <Map data={dataObj[loc] ? [dataObj[loc]] : data.locations}/>
          </Row>
        </Grid>
      </div>
    )
  }
}

export default Locations