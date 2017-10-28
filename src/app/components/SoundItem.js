import React from "react";
import styles from "../../css/soundItem.css";
//import play from '../../img/play.svg';

export class SoundItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            soundInfo: props.music,
            isPlaying: false,
            currTime: 0,
            barSize: 180
        };

        this.audio = new Audio(props.music.soundSrc);
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

        (curr >= duration) ? console.log("End") :
                            this.setState({
                                currTime: this.state.barSize * (curr / duration)
                            });
    }

    setTime(e) {
        var x = e.clientX - e.target.offsetLeft;
        this.audio.currentTime = x * this.audio.duration / this.state.barSize;
        this.updateBar();
    }

    render() {
        let { soundInfo } = this.state;
        let barWidth = { width: this.state.currTime + "px" };

        return (
            <div className={styles.root}>
                <img src={soundInfo.imgSrc} alt=""/>
                <div className={styles.soundControl}>
                    <p><div className={this.state.isPlaying ? styles.btnStop : styles.btnPlay} onClick={() => this.switchPlay()}></div></p>
                    <div className={styles.barFull} onClick={ (e) => this.setTime(e) } style={{width: this.state.barSize + 'px'}}>
                        <span className={styles.barLeft} style={barWidth}></span>
                    </div>
                </div>
                <div className={styles.soundInfo}>
                    <div className={styles.soundName}>{soundInfo.title}</div>
                    <div className={styles.soundAuthor}>{soundInfo.author}</div>
                </div>
            </div>
        );
    };
}