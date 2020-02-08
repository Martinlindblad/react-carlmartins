import React, { Component } from "react";
import Time from "./childcomponents/time";
import Info from "./childcomponents/info";
import "./player.scss"
import fire from "../../fire"
import Tracks from "./tracks/tracks"


class Player extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playStatus: false,
            renderStatus: false,
            currentTime: 0,
            track: {
                source: "",
            }

        };
        this.togglePlayPause.bind();
        this.updateCurrentTrackData.bind();
        this.updateSource = this.updateSource.bind(this);
        this.updateCurrentTrackData = this.updateCurrentTrackData.bind(this);
    }

    componentDidMount() {
        this.setCurrentTrackData();
        this.renderAudio()
    }

    renderAudio() {
        this.setState({ renderStatus: true })
        setTimeout(() => {
            this.getStorage()
        }, 1000);
    }

    // setCurrentTrackData = () => {
    //         const rootRef = fire.database().ref()
    //         const speedRef = rootRef.child(`trackOne`);
           
    //         speedRef.on('value', snap => {
    //             this.setState({
    //                 track: snap.val()
    //             })
    //         })
    //     } 
    setCurrentTrackData = () => {
        const speedRef = fire.database().ref(`trackOne`)
        speedRef.on(`value`, snap => {
            this.setState({ track: snap.val() }, () => {
                console.log(this.state.track, `set track`);
            });
        })
        }
        updateCurrentTrackData = (track) => {
            console.log(track)
            const rootRef = fire.database().ref(`track${track.charAt(0).toUpperCase() + track.slice(1)}`)
            console.log(rootRef)
            rootRef.on(`value`, snap => {
                this.setState({ track: snap.val() }, () => {
                    console.log(this.state.track, `value`);
                });
            })
        }

        // updateCurrentTrackData = (track) => {
        //     console.log(track)
        //     const rootRef = fire.database().ref(`track${track.charAt(0).toUpperCase() + track.slice(1)}`)
        //     console.log(rootRef)
        //     rootRef.on("child_added", snap => {
        //         this.setState({ track: snap.val() }, () => {
        //             console.log(this.state.track, "track");
        //         });
        //     })
        // }
    
    // updateCurrentTrackData = (track) => {
    //     const rootRef = fire.database().ref(`trackOne`)
    //     // const speedRef = rootRef.child(`trackOne`);
    //     // const speedRef = rootRef.child(`track${track.charAt(0).toUpperCase() + track.slice(1)}`);
    //     console.log(rootRef)
    //     rootRef.on('value', snap => {
    //         this.setState({ track: snap.val() }, () => {
    //             console.log(this.state.track, 'update track');
    //         });
    //     })
    // }

    getStorage() {
        this.getAudio()
        this.getArtwork();
    }

    getArtwork() {
        const storage = fire.storage();
        const storageRef = storage.refFromURL('gs://react-carlmartins.appspot.com/track')
        let trackTitle = this.state.track.title;
        trackTitle = trackTitle.toString().toLowerCase().replace(/\s/g, '');
        storageRef.child(`${trackTitle}.jpg`)
            .getDownloadURL()
            .then((url) => {
                var xhr = new XMLHttpRequest();
                xhr.responseType = 'blob';
             
                xhr.open('GET', url);
                xhr.send();
                let art = url;
                this.setState({
                    track: {
                        ...this.state.track,
                        artwork: art
                    }
                });
            }).catch(function (error) {
                // Handle any errors
                console.log('this is some error', error)
            });
    }

    getAudio() {
        const storage = fire.storage();
        const storageRef = storage.refFromURL('gs://react-carlmartins.appspot.com/track')
        let trackAudio = this.state.track.title;
        trackAudio = trackAudio.toString().toLowerCase().replace(/\s/g, '');
        storageRef.child(`${trackAudio}.mp3`)
            .getDownloadURL()
            .then((url) => {
                var xhr = new XMLHttpRequest();
                xhr.responseType = 'blob';
                xhr.open('GET', url);
                xhr.send();
                let audio = url;
                this.setState({
                    track: {
                        ...this.state.track,
                        source: audio
                    }
                });
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
        if (time === 0) {
            audio.load();
        }
        if (status === false) {
            status = true;
            audio.play();
        } else if (time + 2 > duration) {
            status = false;
            audio.pause();
            audio.load();
        }
        else {
            status = false;
            audio.pause();
        }
        this.setState({ playStatus: status });
        const timeBomb = setInterval(() => {

            this.updateTime();
            this.updateBackground();
            console.log(time, duration)

        }, 1000);
        if (status === false) {
            clearInterval(timeBomb)
        }
    }

    updateSource = (trackSource) => {
        this.setState({
            track: {
                ...this.state.track,
                source: trackSource
            }
        });
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
            <div className="front">
                <div className="player">
                    <div className="overlay"></div>
                    <h1 className="artist">{this.state.track.producer}</h1>
                    <div className="artwork" style={{ 'backgroundImage': 'url(' + this.state.track.artwork + ')' }}></div>
                    <div className="track">
                        <Info track={this.state.track} />
                        <Time duration={Math.floor(this.state.track.duration / 60) + ':' + Math.floor(this.state.track.duration % 60 + 1)} currentTime={this.state.currentTime} />
                    </div>
                    {this.state.renderStatus === true ? <audio id="audio"><source src={this.state.track.source} /></audio> : null}
                    <div className="button" onClick={this.togglePlayPause}>
                        {this.state.playStatus === false ? "▶" : "⏸"}
                    </div>
                </div>
                <Tracks updateCurrentTrackData ={this.updateCurrentTrackData} setCurrentTrackData={this.setCurrentTrackData} updateSource={this.updateSource} togglePlayPause={this.togglePlayPause} track={this.state.track} playStatus={this.state.playStatus} />
            </div>
        )
    }
}

export default Player