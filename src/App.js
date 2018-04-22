import React, {Component} from 'react';
import './App.css';
import Search from './components/Search'
import Map from './components/Map'

class App extends Component {

  render() {

    return (
      <div className="App">
        <Map/>
        <Search/>
      </div>
    );
  }
}

export default App;