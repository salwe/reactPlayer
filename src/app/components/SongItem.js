import React from 'react';
import styles from '../../css/songItem.css';
//import play from '../../img/play.svg';

class SongItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            songInfo: props.song
        };
    }

    render() {
        const { songInfo } = this.state;

        return (
            <div className='list-group-item d-flex justify-content-between'>
                <div className=''>
                    {songInfo.author} - {songInfo.title}
                </div>
                <div className={this.props.isSelected ? styles.btnStop : styles.btnPlay}>
                    <div className={this.props.isPlaying ? styles.btnStop : styles.btnPlay} onClick={() => this.props.playClick(songInfo.id)}></div>
                </div>
            </div>
        );
        
        // let progressBar = <div style={{height:'3px'}}></div>;
        // if (this.props.selected) {
        //     progressBar = <div className={styles.barWr}>
        //                     <div className={styles.barFull} onClick={(e) => this.props.setTime(e)} >
        //                         <span className={styles.barLeft} style={{width: this.state.currTime + '%'}}></span>
        //                     </div>
        //                 </div>
        // }

        // return (
        //     <div className={styles.root}>
        //         <img src={songInfo.imgSrc} alt=""/>
        //         <div className={styles.songControl}>
        //             <div className={this.props.isPlaying ? styles.btnStop : styles.btnPlay} onClick={() => this.props.playClick(songInfo.id)}></div>
        //         </div>
        //         {progressBar}
        //         <div className={styles.songInfo}>
        //             <div className={styles.songName}>{songInfo.title}</div>
        //             <div className={styles.songAuthor}>{songInfo.author}</div>
        //         </div>
        //     </div>
        // );
    };
}

export default SongItem;