import React from 'react';
import styles from '../../css/songItem.css';
//import play from '../../img/play.svg';

class SongItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            songInfo: props.song
        };


        // this.audio = new Audio(props.songsObj.songSrc);
        // this.audio.addEventListener("timeupdate", () => this.updateBar(), false);
    }

    updateBar() {
        let duration = this.audio.duration;
        let curr = this.audio.currentTime;

        (curr >= duration) ? console.log("End") : this.setState({ currTime: 100 * (curr / duration) });
    }

    setTime(e) {
        var x = e.clientX - e.currentTarget.offsetLeft;

        // converting px to percent
        var perc = 100 * x / e.currentTarget.getBoundingClientRect().width;
        this.audio.currentTime = perc * this.audio.duration / 100;
        this.updateBar();
    }

    render() {
        const { songInfo } = this.state;
        
        let progressBar = <div style={{height:'3px'}}></div>;
        if (this.props.selected) {
            progressBar = <div className={styles.barWr}>
                            <div className={styles.barFull} onClick={(e) => this.props.setTime(e)} >
                                <span className={styles.barLeft} style={{width: this.state.currTime + '%'}}></span>
                            </div>
                        </div>
        }

        return (
            <div className={styles.root}>
                <img src={songInfo.imgSrc} alt=""/>
                <div className={styles.songControl}>
                    <div className={this.props.isPlaying ? styles.btnStop : styles.btnPlay} onClick={() => this.props.playClick(songInfo.id)}></div>
                </div>
                {progressBar}
                <div className={styles.songInfo}>
                    <div className={styles.songName}>{songInfo.title}</div>
                    <div className={styles.songAuthor}>{songInfo.author}</div>
                </div>
            </div>
        );
    };
}

export default SongItem;