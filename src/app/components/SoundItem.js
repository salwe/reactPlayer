import React from "react";
import styles from "../../css/soundItem.css";
//import play from '../../img/play.svg';


export class SoundItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            soundInfo: props.music,
            isPlaying: false,
            currTime: 0
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
                                currTime: 100 * (curr / duration)
                            });
    }

    setTime(e) {
        var x = e.clientX - e.currentTarget.offsetLeft;

        // converting px to percent
        var perc = 100 * x / e.currentTarget.getBoundingClientRect().width;
        this.audio.currentTime = perc * this.audio.duration / 100;
        this.updateBar();
    }

    render() {
        let { soundInfo } = this.state;

        return (
            <div className={styles.root}>
                <img src={soundInfo.imgSrc} alt=""/>
                <div className={styles.soundControl}>
                    <div className={this.state.isPlaying ? styles.btnStop : styles.btnPlay} onClick={() => this.switchPlay()}></div>
                </div>
                <div className={styles.barWr}>
                    <div className={styles.barFull} onClick={(e) => this.setTime(e)} >
                        <span className={styles.barLeft} style={{width: this.state.currTime + '%'}}></span>
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