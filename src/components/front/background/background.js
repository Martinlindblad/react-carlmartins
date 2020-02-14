import React, { Component } from 'react';
// import "./background.scss"


class Background extends Component {
    constructor(props){
        super(props)
        this.state = {
            playing: ["lights", "dj", "citytwo", "milky", "traffic", "sunrise", "lighthouse", "fog", "la"], // All the names for the background videos
            number: 0,
        }
    }

    changeVideo(){   // Will change the video state that leads to video source
        let videos = this.state.number;
        let playing = this.state.playing;
        let video = document.querySelector("video")       
            if(videos < playing.length - 1){
                this.setState({
                    number: videos + 1 
                }) 
                video.load()
            }else{
                this.setState({
                    number: 0
                }) 
                video.load()
            }
        }
    render() {
        return (
            <div>
            <div className="overlaybg"></div>
            <video className="backgroundVideo" autoPlay="autoPlay" muted onEnded={this.changeVideo.bind(this)} >
                <source src={require(`../../../media/${this.state.playing[this.state.number]}.mp4`)} type="video/mp4" />
            </video>
            </div>
        )
    }

} export default Background