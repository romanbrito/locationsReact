import React, {Component} from 'react'
import {Grid, Row} from 'react-bootstrap'
import Map from './Map'

class Locations extends Component {

  state = {
    data: null
  }

  componentWillMount() {
    fetch('http://www.texadelphia.com/wp-content/themes/texsite/json/locations.json', {method: 'GET'})
      .then(res => res.json())
      .then(data => this.setState({data}))
  }

  render() {
    // should work too if url is locations-menu
    const loc = this.props.match.params.location
    const {data} = this.state

    return (
      <div className="App">
        <Grid fluid>
          <Row>
            {data ? <Map data={arrayToObject(data.locations)[loc] ? [arrayToObject(data.locations)[loc]] : data.locations}/>:
            <p>Loading...</p>
            }
          </Row>
        </Grid>
      </div>
    )
  }
}

export default Locations

// utilities
const arrayToObject = (array) => {

  return array.reduce((obj, item) => {
    obj[item.id] = item
    return obj
  }, {})

}