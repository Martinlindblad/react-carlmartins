import React, { Component } from "react";
import Player from "./player/player"
import Tracks from "./tracks/tracks"

class Hero extends Component{
    constructor() {
        super();
        this.state = {
            post: false,
        };
    }
    setPostTrue() {
        if (this.state.post !== true) { this.setState({ post: true }) }
      }
      render() {
         
          return (
              <div className="front">
                  <Player />
                  <Tracks />
              </div>
          )
      }
}

export default Hero;