import React, { Component } from 'react';
// import Header from "./components/header/header.js"
import Player from "./components/front/player"
// import Footer from "./components/footer/footer.js"
import Background from './components/front/background/background.js';
import './App.scss';


class App extends Component {
  constructor() {
    super();
    this.state = {
      post: false,
    }
  }

  didRender() {
    this.setState({ post: true })
  }

  componentDidMount() {
    this.didRender()
  }
  render() {
    return (
      <div className="container">
        
        {/* <Header />  */}
        <Background />
        <Player />

        {/* <Footer />  */}
      </div>
    )
  }
}

export default App

