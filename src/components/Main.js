import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Locations from './Locations'

const Main = () => {

  return (
    <Switch>
      <Route exact path={'/'} component={Locations}/>
      <Route path='/:location' component={Locations}/>
    </Switch>
  )
}

export default Main