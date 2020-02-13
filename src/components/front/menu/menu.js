import React, { Component } from "react"
import "./menu.scss"

class Menu extends Component {
    constructor(props) {
        super(props);    
    };

    openAllTracks = (track) => {
        this.props.changeWhichTrack(track);
    }

    render(){

        return (
            <div onClick={() => {this.openAllTracks("all")}} className="menu">
                <div className="burger">
                    <div className="line"></div>
                    <div className="line"></div>
                    <div className="line"></div>
                </div>
                <div className="social-media">
                    <ul>
                        <a src="https://www.instagram.com/thecarlmartins/"><li><img src={require("../../../media/insta.png")}></img></li></a>
                        <a src="#"><li><img src={require("../../../media/twitter.png")}></img></li></a>
                        <a src="https://www.youtube.com/channel/UC1l61JT3Ad1KNEcjQ727VeQ"><li><img src={require("../../../media/yt.png")}></img></li></a>
                    </ul>
                </div>
            </div>
            )
        }
    }
export default Menu