import React, { Component } from "react"
// import "./tracks.scss"
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
    sendSource = (track, trackSource) => {  // Will send clicked tracks data to Player component to handle
        let audio = document.querySelector('audio');
        this.props.updateCurrentTrackData(track); // Will update all the data for this clicked track
        audio.load(); // Reloads the audio 
        this.props.updateSource(trackSource); // Will set new source
        this.props.togglePlayPause() // Will toggle play the music
    }

    render() {
        return (
            <div className="tracks-container">
                {this.props.tracks.map((track, i) => { // Loop out all tracks from Player state
                    return (
                        <div key={i} className={track.track} style={{ 'backgroundImage': 'url(' + this.props.artworks[i] + ')' }}>
                            <div className="bubble"><p className={"p" + track.track} onClick={() => {
                                this.sendSource(track.track, track.source) // Sending clicked track 
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
                    )})
                }
            </div>
        )
    }
}
export default Tracks