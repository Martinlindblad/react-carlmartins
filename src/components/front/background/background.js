import React, { Component } from 'react';
import "./background.scss"

const video = require("../../../media/city.mp4")
class Background extends Component {
    render() {
        return (
            <video className="backgroundVideo" autoPlay="autoPlay" muted loop >
                <source src={video} type="video/mp4" />
            </video>
        )
    }

} export default Background