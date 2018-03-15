import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions/songActions';
import MusicList from '../components/MusicList';
import SongItem from '../components/SongItem';
import styles from '../../css/songApp.css';

class MusicApp extends React.Component {
    constructor() {
        super();

        this.state = {
            currTime: 0,
            duration: 0,
            currentSongInfo: ''
        };

        this.audio = new Audio();

        // this.audio.onloadedmetadata = () => {
        //     this.setState({
        //         currentSongInfo: this.audio.duration
        //     })};
        this.audio.ontimeupdate = () => { this.updateBar() };
    }

    componentDidMount() {
        this.loadData('../json/musicList.json');
    }

    async loadData(path) {
        const res = await fetch(path);
        const json = await res.json();

        json.forEach(song => this.props.addSong({ song }));
    }

    getCurrentSongInfo(id) {
        return this.props.songsObj.songArray.filter(el => el.id === id)[0];
    }

    // Controls
    setSongSrc(id) {
        const song = this.getCurrentSongInfo(id);
        this.audio.src = song.songSrc;
        //this.audio.setAttribute('src', song.songSrc);

        this.setState({
            currentSongInfo: song
        });
    }

    playSong(id) {
        this.props.playSong(id);
        this.audio.play();
    }

    stopSong() {
        this.props.stopSong();
        this.audio.pause();
    }
    
    changeSong(id) {
        this.setSongSrc(id);
        this.playSong(id);
    }

    switchPlaying(id) {
        if (this.props.songsObj.currentSong === id) {
            this.props.songsObj.isPlaying ? this.audio.pause() : this.audio.play();
            this.props.changePlay(id);
        }
        else {
            this.changeSong(id);
        }
    }

    //Progress bar
    updateBar() {
        let duration = this.audio.duration;
        let curr = this.audio.currentTime;

        (curr >= duration) ? console.log("End") : this.setState({ currTime: 100 * (curr / duration) });
    }

    setTime(e) {
        const barElement = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - barElement.x;
        
        // converting px to percent
        var perc = 100 * x / barElement.width;
        this.audio.currentTime = perc * this.audio.duration / 100;
        this.updateBar();
    }

    render() {
        const { songsObj } = this.props;
        const { currentSongInfo } = this.state;

        let currentSong = '';
        if (currentSongInfo) {
            currentSong = 
            <div className='row'>
                <div className='col-4'><img src={currentSongInfo.imgSrc} alt="" className={styles.songImg} /></div>
                <div className='col-8'>
                    <p>{currentSongInfo.author} - {currentSongInfo.title}</p>
                    <p>{currentSongInfo.album} ({currentSongInfo.year})</p>
                    <div className={styles.barWr}>
                        <div className={styles.barFull} onClick={(e) => this.setTime(e)} >
                            <span className={styles.barLeft} style={{width: this.state.currTime + '%'}}></span>
                        </div>
                    </div>
                </div>
            </div>;
        };

        if (songsObj) {
            return(
                <div className='row'>
                    <div className='col-4'>
                        <MusicList songsObj={songsObj} playClick={this.switchPlaying.bind(this)} />
                    </div>
                    <div className='col-8'>
                        { currentSong }
                    </div>
                </div>
            );
        }
        
        return <div>Loading...</div>;
    }
}

const mapStateToProps = (state) => {
    return {
        songsObj: state
    };
};

export default connect(mapStateToProps, actions)(MusicApp);