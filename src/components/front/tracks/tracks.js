import React, { Component } from "react"
import "./tracks.scss"
import fire from "../../../fire"

class Tracks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trackOne: {},
            trackTwo: {},
            trackThree: {},
            combined: [],
            artwork: {}

        };
    }

    componentDidMount() {
        this.setCurrentTrackData()
        setTimeout(() => {
            this.combineState()
        }, 1000);
        setTimeout(() => {
            this.combineState()
        }, 5000);
    }

    getTrackOne() {
        const rootRef = fire.database().ref()
        const speedRef = rootRef.child('track');
        speedRef.on('value', snap => {
            this.setState({
                trackOne: snap.val()
            })

        })
    }

    getTrackTwo() {
        const rootRef = fire.database().ref()
        const speedRef = rootRef.child('trackTwo');
        speedRef.on('value', snap => {
            this.setState({
                trackTwo: snap.val()
            })
        })
    }

    getTrackThree() {
        const rootRef = fire.database().ref()
        const speedRef = rootRef.child('trackThree');
        speedRef.on('value', snap => {
            this.setState({
                trackThree: snap.val()
            })
        })
    }

    setCurrentTrackData() {
        this.getTrackOne()
        this.getTrackTwo()
        this.getTrackThree()
    }

    getStorage() {
        this.getArtwork();
    }

    getArtwork() {
        const storage = fire.storage();
        const storageRef = storage.ref();
        let trackTitleOne = this.state.trackOne.title;
        let trackTitleTwo = this.state.trackTwo.title;
        let trackTitleThree = this.state.trackThree.title;
        let trackCollect = [trackTitleOne, trackTitleTwo, trackTitleThree]

        for (let i = 0; i < trackCollect.length; i++) {
            console.log(trackCollect[i].toString().toLowerCase().replace(/\s/g, ''))
            storageRef.child(`track/${trackCollect[i].toString().toLowerCase().replace(/\s/g, '')}.jpg`)
                .getDownloadURL()
                .then((url) => {
                    // This can be downloaded directly:
                    var xhr = new XMLHttpRequest();
                    xhr.responseType = 'blob';
                    xhr.onload = function (event) {
                        var blob = xhr.response;
                    };
                    xhr.open('GET', url);
                    xhr.send();
                    // Or inserted into an <img> element:
                    let art = url;
                    this.setState(combined => ({
                        combined: combined.combined.map(
                            obj => (Object.assign(obj, { artwork: art }))
                        )
                    }));
                }).catch(function (error) {
                    // Handle any errors
                    console.log('this is some error', error)
                });
        }
    }

    combineState() {
        this.setState({
            combined: [
                {
                    ...this.state.trackOne,
                },
                {
                    ...this.state.trackTwo
                },
                {
                    ...this.state.trackThree
                }
            ]
        }, this.getStorage())
    }

    render() {
        return (

            <div className="tracks-container">
                {this.state.combined.map((track, i) => {
                    return (
                        <div key={i} className={track.track} style={{ 'backgroundImage': 'url(' + track.artwork + ')' }}>
                            <h2 className="Artist">{track.title}</h2>
                            <div className="track-info">
                                <h3>{track.album}</h3>
                                <p>{track.description}</p>
                            </div>
                            <div className="button" onClick={this.togglePlayPause}>
                                {this.state.playStatus === false ? "▶" : "⏸"}
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