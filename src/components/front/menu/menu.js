import React, { Component } from "react"
// import "./menu.scss"

class Menu extends Component {
    constructor(props) {
        super(props);  
        this.state = {
            activeClass: ""
        }  
    };


    openAllTracks = (track) => {                    // Send Callback information if menu is open
        this.props.changeWhichTrack(track);
        setTimeout(() => {
            console.log(this.props.whichTrack)
            this.props.whichTrack !== "all" ?
            this.setState({ activeClass: ""})      // Decides if the menu shold be open or closed
            :
            this.setState({ activeClass: "open"})

        },500);
    }

    render(){

        return (
            <div onClick={() => {
                this.state.activeClass === "" ? //Send diffrent information depending on where user is
                this.openAllTracks("all")
                : 
                this.openAllTracks("justthree")
            }} className="menu">
                <div className={`burger`}>
                    <div className={`line ${this.state.activeClass}`}></div>
                    <div className={`line ${this.state.activeClass}`}></div>
                    <div className={`line ${this.state.activeClass}`}></div>
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