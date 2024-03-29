import React, { Component } from "react";
import Time from "./childcomponents/time";
import Info from "./childcomponents/info";
import "./player.scss"
import fire from "../../fire"
import Tracks from "./tracks/tracks"
import BuyTrack from "./buyTrack/buyTrack"
import Menu from "./menu/menu"
import AllTracks from "./allTracks/allTracks"


class Player extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playStatus: false,
            renderStatus: false,
            currentTime: 0,
            playingTrack: "",
            whichTrack: "justthree",
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

    // Component will set referense to db and get audio, storage, data and render when mounted

    componentDidMount() {
        setTimeout(() => {
            this.setCurrentTrackData()
            this.renderAudio();
        }, 1000);

        this.getTracks();
        setTimeout(() => {
            this.getStorage()
        }, 2000);

    }

    renderAudio() {  // Called upon when rendering Audio is okay.
        setTimeout(() => {
            this.setState({ renderStatus: true })
        }, 1000);
    }


    setCurrentTrackData = () => {  //Will set the data for current track from firebase 
        const speedRef = fire.database().ref(`tracks/trackOne`)
        speedRef.on(`value`, snap => {
            this.setState({ track: snap.val() }, () => { // creating a state with everything found on ref('rootname')
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

    gatherTracks() {  // Will get the three tracks on the start page and activate an animation when called upon
        let one = document.querySelector('.one')
        let two = document.querySelector('.two')
        let three = document.querySelector('.three')
        one.style = ' ';
        two.style = ' ';
        three.style = ' ';
        void one.offsetWidth;
        one.style.animation = 'moveTrackOne 2s ease'
        void two.offsetWidth;
        two.style.animation = 'moveTrackTwo 2s ease'
        void three.offsetWidth;
        three.style.animation = 'moveTrackThree 2s ease'
    }

    changeWhichTrack = (track) => {            // Callback function from menu to change whichtrack (view) to render 
        console.log(track)
        this.setState({ whichTrack: track })
    }

    updateCurrentTrackData = (track) => {  // Will update the current track with a onClick event, recives data from clicked Track.
        if (this.state.whichTrack === "justthree") {
            this.gatherTracks()
        }
        setTimeout(() => {  // Set state for which track is being updated
            this.setState({ whichTrack: track })
            const rootRef = fire.database().ref(`tracks/track${track.charAt(0).toUpperCase() + track.slice(1)}`) //make sure to send the right information to the database
            rootRef.on(`value`, snap => {
                this.setState({ track: snap.val() }, () => {
                    console.log(this.state.track, `value`);
                });
            })
        }, 2000);
        setTimeout(() => {
            this.getStorage()
        }, 3000);
    }

    getStorage() {  // Will call all storage files, audio/pictures.
        this.getAudio()
        this.getArtwork();
        this.getArtworks();
    }

    getArtwork() {  // Call on db to get artwork from storage
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

    getAudio() {  // Get audio from db when called upon
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

    togglePlayPause = () => {  // Activated through several buttons on the page, called upon when user want to play or pause a track.
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
        const timeBomb = setInterval(() => {  // Update time for user to see how much of the song that's been played
            this.updateTime();
            this.updateBackground();
        }, 1000);
        setTimeout(() => {
            clearInterval(timeBomb)  // Will stop the interval from looping, causing memory leak.
        }, duration * 1000);
    }

    updateSource = (trackSource) => {  // Will change state of which tracks audio is being played
        this.setState({
            track: {
                ...this.state.track,
                source: trackSource
            }
        });
    }

    updateTime = (time) => {  // Update's the time played of current track
        let audio = document.getElementById('audio');
        time = audio.currentTime;
        time = Math.floor(time);
        this.setState({ currentTime: time })
    }

    updateBackground = (percent) => {  //This will create a animation displaying how much time been played on the track.
        let audio = document.querySelector('audio')
        let currentTime = audio.currentTime;
        let duration = this.state.track.duration;
        percent = (currentTime / duration) * 100 + '%';
        let timestamps = document.querySelector('.timestamps-bkg');
        timestamps.style['width'] = percent;
    }

    //TRACKS
    
    getTracks() {
        const rootRef = fire.database().ref()  // Will call for all tracks to db
        const speedRef = rootRef.child(`tracks`);
        speedRef.on('value', snap => {
            console.log(this.snapshotToArray(snap));
        })
    }
    snapshotToArray(snap) {  // Will gather all tracks piced up from db
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


    getArtworks = () => {  // Will get artworks for tracks
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
        this.setState({ artworks: artworks });
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
                    {this.state.renderStatus === true ? <audio onEnded={this.togglePlayPause} id="audio"><source src={this.state.track.source} /></audio> : null}
                    <div className="button" onClick={this.togglePlayPause}>
                        {this.state.playStatus === false ? "▶" : "⏸"}
                    </div>
                </div>
                
                {this.state.whichTrack === "all" ?                     // Render views with all needed props
                    <AllTracks whichTrack={this.state.whichTrack}
                        tracks={this.state.tracks} // state tracks
                        playingTrack={this.state.playingTrack} // state for playing track
                        whichTrack={this.state.whichTrack} // state for which track is playing
                        updateCurrentTrackData={this.updateCurrentTrackData} // update the current track method
                        setCurrentTrackData={this.setCurrentTrackData} // set current tracks data method
                        updateSource={this.updateSource} // update source method
                        togglePlayPause={this.togglePlayPause} // toggle playstatus button method
                        track={this.state.track} // state for Player track
                        playStatus={this.state.playStatus} // state for playstatus 
                        artworks={this.state.artworks}
                        playingTrack={this.state.playingTrack}
                    /> : this.state.whichTrack === "justthree" ?
                        <Tracks artworks={this.state.artworks} // state artwork
                            tracks={this.state.tracks} // state tracks
                            playingTrack={this.state.playingTrack} // state for playing track
                            whichTrack={this.state.whichTrack} // state for which track is playing
                            updateCurrentTrackData={this.updateCurrentTrackData} // update the current track method
                            setCurrentTrackData={this.setCurrentTrackData} // set current tracks data method
                            updateSource={this.updateSource} // update source method
                            togglePlayPause={this.togglePlayPause} // toggle playstatus button method
                            track={this.state.track} // state for Player track
                            playStatus={this.state.playStatus} // state for playstatus 
                        />
                        : <BuyTrack tracks={this.state.tracks} // state tracks
                            playStatus={this.state.playStatus} // state for playstatus
                            updateSource={this.updateSource} // update source method
                            artworks={this.state.artworks} // state artwork
                            updateCurrentTrackData={this.updateCurrentTrackData} // update the current track method
                            togglePlayPause={this.togglePlayPause} // toggle playstatus button method
                            track={this.state.track} // state for Player track
                            whichTrack={this.state.whichTrack} // state for which track is playing
                        />
                }
                <Menu whichTrack={this.state.whichTrack} changeWhichTrack={this.changeWhichTrack} />
            </div>
        )
    }
}

export default Player