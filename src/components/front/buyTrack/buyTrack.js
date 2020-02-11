import React, { Component } from "react";
import "./buyTrack.scss";

class BuyTrack extends Component {
    constructor(props) {
        super(props);
     
        };
    render() {

        return (
            <div className="buyTrack">
                 <div  className={this.props.track.track} style={{ 'backgroundImage': 'url(' + this.props.track.artwork + ')' }}>
                    <h2>{this.props.track.title}</h2>
                    <div>
                        <div>
                            <p>Buy Track</p>
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