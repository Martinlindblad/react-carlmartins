import React, { Component } from "react";
import "./buyTrack.scss";

class BuyTrack extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playStatus: true,
        }
    };
    render() {

        return (
            <div className="buyTrack">
                <div className={this.props.track.track} style={{ 'backgroundImage': 'url(' + this.props.track.artwork + ')' }}>
                    <h2>{this.props.track.title}</h2>
                    <div className="bubble"><p className={"p" + this.props.track} onClick={() => {
                        this.props.togglePlayPause();
                        this.state.playStatus === true ? this.setState({
                            playStatus: false
                        }) : this.setState({
                            playStatus: true
                        });
                    }}>
                        {(this.state.playStatus !== false) ? "▶" : "⏸"}</p>
                    </div>
                    <div className="bottom">
                        <div className="buy">
                            <h4>Buy Track</h4>
                            <p>Get this track through beatstarts</p>

                            <div className="button" onClick={() => {
                                window.location.assign(this.props.track.buyUrl)
                            }} >
                                <p>buy</p>
                            </div>
                        </div>
                        <div className="carousel">
                            
                        </div>
                    </div>
                </div>

            </div>

        )

    }
}
export default BuyTrack