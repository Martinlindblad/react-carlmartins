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