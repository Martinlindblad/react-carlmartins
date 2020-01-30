import React, { Component } from "react";
import Time from "./childcomponents/time";
import Info from "./childcomponents/info";
import Api from '../../../data/data.json';
import "./player.scss"
import fire from "../../../fire"

class Player extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playStatus: false,
            currentTime: 0,
            track: {
                producer: "CARLMARTINS",
                artwork: "",
                id: 1,
                title: "mastered",
                album: "Led Line Tullinge",
                year: 2017,
                duration: 168,
                source: "https://stream.beatstars.com/c/carlmartins-258227/644100/506f48319b5719fb438351a19889d655.mp3?on_callback=true",
                buyUrl: "https://carlmartins.com/beat/1984-store-test-track-644100",
                description: "Yeah I'm callin' in to request... uh... any music, that ain't this. Stop playing everything that you been playing because your music sounds like a dumpster rollin' down five flights o' stairs!"
            }

        };

    }

    componentDidMount() {
        this.setCurrentTrackData();
    }
    
    
    setCurrentTrackData() {
        const rootRef = fire.database().ref()
        const speedRef = rootRef.child('track');
        speedRef.on('value', snap => {
            this.setState({
                track: snap.val()
            }, this.getStorage())
            
        })
    }
    getStorage() {
        this.getArtwork();
        this.getAudio()
    }

    getArtwork() {
        const storage = fire.storage();
        const storageRef = storage.ref();
        let trackTitle = this.state.track.title;
        trackTitle = trackTitle.toString().toLowerCase().replace(/\s/g, '');
        storageRef.child(`track/${trackTitle}.jpg`)
            .getDownloadURL()
            .then((url) => {
                // This can be downloaded directly:
                var xhr = new XMLHttpRequest();
                xhr.responseType = 'blob';
                xhr.onload = function (event) {
                    var blob = xhr.response;
                };
                xhr.open('GET', url);
                xhr.send();
                // Or inserted into an <img> element:
                let art = url;
                this.setState({
                    track: {
                        ...this.state.track,
                         artwork: art
                    }
                });
                console.log({ art });
            }).catch(function (error) {
                // Handle any errors
                console.log('this is some error', error)
            });
    }

    getAudio() {
        const storage = fire.storage();
        const storageRef = storage.ref();
        let trackAudio = this.state.track.title;
        trackAudio = trackAudio.toString().toLowerCase().replace(/\s/g, '');
        storageRef.child(`track/${trackAudio}.mp3`)
            .getDownloadURL()
            .then((url) => {
                // This can be downloaded directly:
                var xhr = new XMLHttpRequest();
                xhr.responseType = 'blob';
                xhr.onload = function (event) {
                    var blob = xhr.response;
                };
                xhr.open('GET', url);
                xhr.send();
                // Or inserted into an <img> element:
                let audio = url;
                this.setState({
                    track: {
                        ...this.state.track,
                         source: audio
                    }
                });
                console.log({ audio });
            }).catch(function (error) {
                // Handle any errors
                console.log('this is some error', error)
            });
    }
    
    togglePlayPause = () => {
        let status = this.state.playStatus;
        let time = this.state.currentTime;
        let duration = this.state.track.duration
        let audio = document.getElementById('audio');
             if (status === false) {
                 status = true; audio.play();
             } else if (time === duration) {
                 status = false; audio.pause();
             }
             else {
                 status = false; audio.pause();
             }
        this.setState({ playStatus: status });
        setInterval(() => {
            this.updateTime();
            this.updateBackground();
        }, 1000);
    }

    updateTime = (time) => {
        let audio = document.getElementById('audio');
        time = audio.currentTime;
        time = Math.floor(time);
        this.setState({ currentTime: time })
    }

    updateBackground = (percent) => {
        let audio = document.querySelector('audio')
        let currentTime = audio.currentTime;
        let duration = this.state.track.duration;
        percent = (currentTime / duration) * 100 + '%';
        let timestamps = document.querySelector('.timestamps-bkg');
        timestamps.style['width'] = percent;
    }

    render() {
        return (

            <div className="player">
                <div className="overlay"></div>
                <h1 className="artist">{this.state.track.producer}</h1>
                <div className="artwork" style={{ 'backgroundImage': 'url(' + this.state.track.artwork + ')' }}></div>
                <div className="track">
                    <Info track={this.state.track} />
                    <Time duration={Math.floor(this.state.track.duration / 60) + ':' + Math.floor(this.state.track.duration % 60 + 1)} currentTime={this.state.currentTime} />
                </div>
                <audio id="audio"><source src="" /> </audio>
                <div className="button" onClick={this.togglePlayPause}>
                    {this.state.playStatus === false ? "▶" : "⏸"}
                </div>
            </div>
        )
    }
}

export default Player