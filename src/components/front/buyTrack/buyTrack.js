import React, { Component } from "react";
import "./buyTrack.scss";
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css'

class BuyTrack extends Component {
  constructor(props) {
    super(props);
  };


  sendSource = (track, trackSource) => {
    let audio = document.querySelector('audio');
    if (this.props.playStatus === false) {
      this.props.updateCurrentTrackData(track);
    }
    audio.load();
    this.props.updateSource(trackSource);
    this.props.togglePlayPause()
  }

  render() {

    return (
      <div className="buyTrack">
        <div className={this.props.track.track} style={{ 'backgroundImage': 'url(' + this.props.track.artwork + ')' }}>
          <h2>{this.props.track.title}</h2>
            <div className="track-info">
              <h3>{this.props.track.album}</h3>
              <p>{this.props.track.description}</p>
            </div>
          <div className="bubble"><p className={"p" + this.props.track} onClick={() => {
            this.props.togglePlayPause();
          }}>
            {this.props.playStatus === false ? "▶" : "⏸"}</p>
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
            <div className="carousel-container">
              <CarouselProvider
                infinite={true}
                naturalSlideWidth={100}
                naturalSlideHeight={125}
                totalSlides={3}>
                <Slider className="slider">
                  {this.props.tracks.map((track, i) => {
                    return (
                      <Slide key={i} className={"b" + track.track} style={{ 'backgroundImage': 'url(' + this.props.artworks[i] + ')' }} index={0}>
                        <div className="bubble"><p className={"p" + track.track} onClick={() => {
                          this.sendSource(track.track, track.source)
                        }}>
                          {this.props.playStatus === false ? "▶" : "⏸"}
                        </p>
                        </div>

                        <div className="wrapper" onClick={() => window.location.assign(track.buyUrl)}>
                          <h2 className="Artist">{track.title}</h2>
                        </div>
                      </Slide>
                    )
                  }
                  )
                  }
                </Slider>
                <ButtonBack className="button-back">˃</ButtonBack>
                <ButtonNext className="button-next">˂</ButtonNext>
              </CarouselProvider>
            </div>
          </div>
        </div>

      </div>

    )

  }
}
export default BuyTrack