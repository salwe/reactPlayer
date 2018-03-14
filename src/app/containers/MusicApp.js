import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions/songActions';
import MusicList from './MusicList';
import SongItem from '../components/SongItem';

class MusicApp extends React.Component {
    constructor() {
        super();

        this.state = {
            currTime: 0,
            duration: 0
        };

        this.audio = new Audio();
        // this.audio.onloadedmetadata = () => {
        //     this.setState({
        //         duration: this.audio.duration
        //     })};
        //this.audio.addEventListener("timeupdate", () => this.updateBar(), false);
    }

    componentDidMount() {
        this.loadData('../json/musicList.json');
    }

    async loadData(path) {
        const res = await fetch(path);
        const json = await res.json();

        json.forEach(song => this.props.addSong({ song }));
    }

    // Controls
    setSongSrc(id) {
        const song = this.props.songsObj.songArray.filter(el => el.id === id)[0];
        this.audio.src = song.songSrc;
        //this.audio.setAttribute('src', song.songSrc);
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
        var x = e.clientX - e.currentTarget.offsetLeft;

        // converting px to percent
        var perc = 100 * x / e.currentTarget.getBoundingClientRect().width;
        this.audio.currentTime = perc * this.audio.duration / 100;
        this.updateBar();
    }

    render() {
        const { songsObj } = this.props;
        if (songsObj) {
            return(
                <div>
                    {/* <audio ref={(ref) => { this.audio = ref; }}></audio> */}
                    <div>
                        {songsObj.songArray.map((el, i) => {
                            let isSelected = Boolean(songsObj.currentSong == el.id);
                            //let audioData = (isSelected) ? {duration:this.state.duration,currTime:this.state.currTime} : null;
                            return <SongItem 
                                key={i} 
                                song={el} 
                                playClick={this.switchPlaying.bind(this)}
                                setTime={this.setTime.bind(this)}
                                selected={isSelected}
                                duration={this.state.duration}
                                isPlaying={Boolean(songsObj.isPlaying && isSelected)}
                                 />
                        })}
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