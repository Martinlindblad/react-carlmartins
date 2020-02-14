import React, { Component } from "react"
// import "./allTracks.scss"

class AllTracks extends Component {
    constructor(props) {
        super(props);    
    };


    sendSource = (track, trackSource) => {  // Send all information and data from clicked track.
        let audio = document.querySelector('audio');
        this.props.updateCurrentTrackData(track); // Will update the current track data.
        audio.load();
        this.props.updateSource(trackSource);
        this.props.togglePlayPause()
    }

    render(){

        return (
            <div className="allTracks">
            {this.props.tracks.map((track, i) => {
                    return (
                        <div key={i} className="tracks" style={{ 'backgroundImage': 'url(' + this.props.artworks[i] + ')' }}>
                            <div className="bubble"><p className={"p" + track.track} onClick={() => {
                                this.sendSource(track.track, track.source)
                            }}>
                                {(this.props.playStatus !== false && this.props.playingTrack === track.track) ? "⏸" : "▶"}</p>
                            </div>
                            <div className="wrapper" onClick={() => window.location.assign(track.buyUrl)}>
                                <h2 className="Artist">{track.title}</h2>
                            </div>
                        </div>
                    )})
                }
            </div>
            )
        }
    }
export default AllTracks