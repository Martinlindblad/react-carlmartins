import React, { Component } from "react";

class Time extends Component {
    
    convertTime = (time) => {
        let minutes = Math.floor(time / 60);
        let seconds = time - (minutes * 60);
        if (seconds < 10) { seconds = '0' + seconds; }
        time = minutes + ':' + seconds;
        return time;
    }
    // Convert Numbers to time
    

    render() {
        return (
            <div className="timestamps">
                <div className="timestamps-bkg"></div>
                <div className="Time Time--current">{this.convertTime(this.props.currentTime)}</div>
                <div className="Time Time--total">{this.props.duration}</div>
            </div>
        )
    } // Renders the current time and the time and the total time
}

export default Time