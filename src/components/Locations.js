import React, {Component} from 'react'
import {Grid, Row} from 'react-bootstrap'
import data from '../json/locations.json'
import Search from './Search'
import Map from './Map'

const arrayToObject  = (array) => {

  return array.reduce( (obj, item) => {
    obj[item.id] = item
    return obj
  }, {})

}

const dataObj = arrayToObject(data.locations)

console.log(dataObj)

class Locations extends Component {

  render() {

    console.log(this.props.match.params.location)

    return (
      <div className="App">
        <Grid fluid>
          <Row>
            <Map data={data.locations}/>
            <Search data={data.locations}/>
          </Row>
        </Grid>
      </div>
    )
  }
}

export default Locations