import React, { Component } from "react"
import "./tracks.scss"
import fire from "../../../fire"

class Tracks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tracks: [],
            artworks: {}
        };
        this.sendSource.bind()
        this.sendSource = this.sendSource.bind(this)
    }

    // snapshotToArray(snap) {
    //     var tracks = [];

    //     snap.forEach(function (childSnapshot) {
    //         var item = childSnapshot.val();
    //         item.key = childSnapshot.key;
    //         tracks.push(item);
    //     });
    //     this.setState({
    //         tracks
    //     })
    //     return tracks
    // };


    // getTracks() {
    //     const rootRef = fire.database().ref()
    //     const speedRef = rootRef.child(`tracks`);
    //     speedRef.on('value', snap => {
    //         console.log(this.snapshotToArray(snap));
    //     })
    // }

    // getStorage() {
    //     this.getArtwork();
    // }

    // getArtwork = () =>  {
    //     const storage = fire.storage();
    //     const storageRef = storage.ref();
    //     let trackTitleOne = this.state.tracks[0].title;
    //     let trackTitleTwo = this.state.tracks[1].title;
    //     let trackTitleThree = this.state.tracks[2].title;
    //     let trackCollect = [trackTitleOne, trackTitleTwo, trackTitleThree]

    //     let artworks = [];
    //     trackCollect.forEach(track => {
    //         storageRef.child(`track/${track.toString().toLowerCase().replace(/\s/g, '')}.jpg`)
    //         .getDownloadURL()
    //         .then((url) => {
    //             var xhr = new XMLHttpRequest();
    //             xhr.responseType = 'blob';
    //             xhr.onload = function (event) {
    //                 var blob = xhr.response;
    //             };
    //             xhr.open('GET', url);
    //             xhr.send();
    //             let art = url;
    //             artworks.push(art);
    //         }).catch(function (error) {
    //             // Handle any errors
    //             console.log('this is some error', error)
    //         })
    //     });
    //         this.setState({artworks: artworks});
    // }

    sendSource = (track, trackSource) => {
        let audio = document.querySelector('audio');
        this.props.updateCurrentTrackData(track);
        audio.load();
        this.props.updateSource(trackSource);
        this.props.togglePlayPause()

    }
    // Use this for event to go to buyUrl onClick={() => window.location.assign(track.buyUrl)}

    render() {
        return (

            <div className="tracks-container">
                {this.props.tracks.map((track, i) => {
                    return (
                        <div key={i} className={track.track} style={{ 'backgroundImage': 'url(' + this.props.artworks[i] + ')' }}>
                            <div className="bubble"><p className={"p" + track.track} onClick={() => {
                                this.sendSource(track.track, track.source)
                            }}>
                                {(this.props.playStatus !== false && this.props.playingTrack === track.track) ? "⏸" : "▶"}</p>
                            </div>

                            <div className="wrapper" onClick={() => window.location.assign(track.buyUrl)}>
                                <h2 className="Artist">{track.title}</h2>
                                <div className="track-info">
                                    <h3>{track.album}</h3>
                                    <p>{track.description}</p>
                                </div>
                            </div>
                        </div>
                    )
                }
                )
                }
            </div>
        )
    }
}
export default Tracks