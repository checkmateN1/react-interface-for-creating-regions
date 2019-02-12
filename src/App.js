import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

//Components
import Rooms from './components/rooms';

class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>regions creator</h1>
        </header>
        <Rooms />
      </div>
    );
  }
}

export default App;
