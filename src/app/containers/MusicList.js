import React from 'react';

import SongItem from '../components/SongItem';

class MusicList extends React.Component {
    render() {
        const curSong = this.props.currSongData;
        if (this.props.songArray) {
            return (
                <div>
                    {this.props.songArray.map((el, i) => <SongItem key={i} song={el} />)}
                </div>
            );
        }

        return <div>Loading...</div>;
    };
}


export default MusicList;