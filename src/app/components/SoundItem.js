import React from "react";
import styles from "../../css/soundItem.css";

export class SoundItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            soundInfo: props.music,
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
        let x = 170 * (curr / duration);
        //console.log(curr);
        
        this.setState({
            x: x
        });
    }

    render() {
        let { soundInfo } = this.state;
        let barWidth = { width: this.state.x + "px" };

        return (
            <div className={styles.root}>
                <p>{soundInfo.author} - {soundInfo.title} <span className={this.state.isPlaying ? styles.btnStop : styles.btnPlay} onClick={() => this.switchPlay()}></span></p>
                <div className={styles.barFull}>
                    <span className={styles.barLeft} style={barWidth}></span>
                </div>
            </div>
        );
    };
}