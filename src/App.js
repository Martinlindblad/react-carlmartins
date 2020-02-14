import React, { Component } from 'react';
import Header from "./components/header/header.js"
import Player from "./components/front/player"
import Background from './components/front/background/background.js';
import './App.scss';


class App extends Component {
  constructor() {
    super();
  }
  // Render the project
  render() {
    return (
      <div className="container">
        <Header /> 
        <Background />
        <Player />
      </div>
    )
  }
}

export default App

