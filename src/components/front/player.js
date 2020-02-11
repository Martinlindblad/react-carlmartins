import React, { Component } from "react";
import Time from "./childcomponents/time";
import Info from "./childcomponents/info";
import "./player.scss"
import fire from "../../fire"
import Tracks from "./tracks/tracks"
import BuyTrack from "./buyTrack/buyTrack"


class Player extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playStatus: false,
            renderStatus: false,
            currentTime: 0,
            playingTrack: "",
            whichTrack: "all",
            track: {
                source: "",
            },
            tracks: [],
            artworks: {}

        };
        this.togglePlayPause.bind();
        this.updateCurrentTrackData.bind();
        this.updateSource = this.updateSource.bind(this);
        this.updateCurrentTrackData = this.updateCurrentTrackData.bind(this);
    }

    componentDidMount() {
        this.setTrackRef();
        setTimeout(() => {
            this.setCurrentTrackData()
            this.renderAudio();
        }, 1000);

        this.getTracks();
        setTimeout(() => {
            this.getStorage()
        }, 2000);

    }

    // componentWillUnmount() {
    //     this.removeTrackRef();
    //     this.props.firebase.messages().off();
    // }

    renderAudio() {
        setTimeout(() => {
            this.setState({ renderStatus: true })
        }, 1000);
    }

    setTrackRef = () => {
        const rootRef = fire.database().ref();
    }

    removeTrackRef = () => {
        const rootRef = fire.database().ref()
        rootRef.off();
    }

    setCurrentTrackData = () => {
        const speedRef = fire.database().ref(`tracks/trackOne`)
        speedRef.on(`value`, snap => {
            this.setState({ track: snap.val() }, () => {
                console.log(this.state.track, `set track`);
            });
        })
        setTimeout(() => {
            let track = this.state.track.track
            this.setState({
                playingTrack: track
            })
        }, 1500);
    }


    updateCurrentTrackData = (track) => {
        this.removeTrackRef()
        this.setTrackRef()
        setTimeout(() => {
            this.setState({ whichTrack: track })
            const rootRef = fire.database().ref(`tracks/track${track.charAt(0).toUpperCase() + track.slice(1)}`)
            rootRef.on(`value`, snap => {
                this.setState({ track: snap.val() }, () => {
                    console.log(this.state.track, `value`);
                });
            })
        }, 1000);
        setTimeout(() => {
            this.getStorage()
        }, 1500);
    }

    getStorage() {
        this.getAudio()
        this.getArtwork();
        this.getArtworks();
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
        }, 1000);
        setTimeout(() => {
            clearInterval(timeBomb)
        }, duration * 1000);
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


    //TRACKS

    snapshotToArray(snap) {
        var tracks = [];

        snap.forEach(function (childSnapshot) {
            var item = childSnapshot.val();
            item.key = childSnapshot.key;
            tracks.push(item);
        });
        this.setState({
            tracks
        })
        return tracks
    };

    getTracks() {
        const rootRef = fire.database().ref()
        const speedRef = rootRef.child(`tracks`);
        speedRef.on('value', snap => {
            console.log(this.snapshotToArray(snap));
        })
    }

    // getTracksStorage() {
    //     this.getArtworks();
    // }

    getArtworks = () =>  {
        const storage = fire.storage();
        const storageRef = storage.ref();
        let trackTitleOne = this.state.tracks[0].title;
        let trackTitleTwo = this.state.tracks[1].title;
        let trackTitleThree = this.state.tracks[2].title;
        let trackCollect = [trackTitleOne, trackTitleTwo, trackTitleThree]

        let artworks = [];
        trackCollect.forEach(track => {
            storageRef.child(`track/${track.toString().toLowerCase().replace(/\s/g, '')}.jpg`)
            .getDownloadURL()
            .then((url) => {
                var xhr = new XMLHttpRequest();
                xhr.responseType = 'blob';
                xhr.onload = function (event) {
                    var blob = xhr.response;
                };
                xhr.open('GET', url);
                xhr.send();
                let art = url;
                artworks.push(art);
            }).catch(function (error) {
                // Handle any errors
                console.log('this is some error', error)
            })
        });
            this.setState({artworks: artworks});
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
                {this.state.whichTrack === "all" ?
                    <Tracks artworks = {this.state.artworks} tracks ={this.state.tracks} removeTrackRef={this.removeTrackRef} playingTrack={this.state.playingTrack} buyTrack={this.state.whichTrack} updateCurrentTrackData={this.updateCurrentTrackData} setCurrentTrackData={this.setCurrentTrackData} updateSource={this.updateSource} togglePlayPause={this.togglePlayPause} track={this.state.track} playStatus={this.state.playStatus} />
                    : <BuyTrack track={this.state.track} buyTrack={this.state.whichTrack} />
                }
            </div>
        )
    }
}

export default Player