import React, { Component } from "react";


class Info extends Component {

    render() {
        return (
            <div className="track-information">
                <div className="title">
                    <p>Now playing -<strong>{this.props.track.title}</strong></p>
                    <p className="Album">{this.props.track.album} ({this.props.track.year})</p>
                </div>
            </div>
        )
    }
}
export default Info
