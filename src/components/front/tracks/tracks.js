import React, { Component } from "react"
import "./tracks.scss"
import fire from "../../../fire"



class Tracks extends Component {
    constructor() {
        super();
        this.state = {
            trackOne: {},
            trackTwo: {},
            trackThree: {},
            combined: [],
            artwork: [],

        };
        this.updateSong.bind()
        this.updateSong = this.updateSong.bind(this)
    }

    componentDidMount() {
        this.setCurrentTrackData()
        setTimeout(() => {
            this.combineState()
        }, 1000);
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
            storageRef.child(`track/${trackCollect[i].toString().toLowerCase().replace(/\s/g, '')}.jpg`)
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
                    
                    var a = this.state.artwork.concat(art);
                    this.setState({ artwork: a })


                    
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

    updateSong() {
        let audio = document.querySelector('audio');
        console.log(audio.firstChild.src)
        console.log(this.props.track.source)
        // console.log(audio.firstChild.src)
                // audio.pause();
                // audio.load();
                // audio.play();
    }

    render() {
        return (

            <div className="tracks-container">
                {this.state.combined.map((track, i) => {
                    return (
                        <div key={i} className={track.track} style={{ 'backgroundImage': 'url(' + this.state.artwork[i] + ')' }}>
                            <div className="bubble"><p className={ "p" + track.track} onClick={this.updateSong}>▶</p></div>
                            <h2 className="Artist">{track.title}</h2>
                            <div className="track-info">
                                <h3>{track.album}</h3>
                                <p>{track.description}</p>
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