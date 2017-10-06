import React from "react";
import SoundBar from "./SoundBar";

export class Music extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            musicInfo: props.music,
            isPlaying: false,
            x: 0
        };

        this.audio = new Audio(props.music.src);
        this.audio.addEventListener("timeupdate", () => this.updateBar(), false);
    }

    switchPlay() {
        this.setState({
            isPlaying: !this.state.isPlaying
        });
        this.state.isPlaying ? this.audio.pause() : this.audio.play();
    }

    updateBar() {
        let duration = this.audio.duration;
        let curr = this.audio.currentTime;
        let x = 500 * (curr / duration);
        
        this.setState({
            x: x
        });
    }

    render() {
        let { musicInfo } = this.state;
        let barLeft = { left: this.state.x + "px" };
        let barWidth = { width: this.state.x + "px" };

        return (
            <div>
                <p>{musicInfo.author} - {musicInfo.title} <span className={this.state.isPlaying ? "btn_stop" : "btn_play"} onClick={() => this.switchPlay()}></span></p>
                <div className="progBarFull">
                    <span className="progBarLeft" style={barWidth}></span>
                    <span className="progPoint" style={barLeft}></span>
                </div>
                <SoundBar />
            </div>
        );
    };
}