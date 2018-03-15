import React from 'react';

import SongItem from '../components/SongItem';

class MusicList extends React.Component {
    render() {
        const { songsObj } = this.props;
        
        return (
            <div className='list-group'>
                {songsObj.songArray.map((el, i) => {
                    let isSelected = Boolean(songsObj.currentSong == el.id);
                    return <SongItem 
                        key={i} 
                        song={el} 
                        playClick={this.props.playClick}
                        setTime={this.props.setTime}
                        selected={isSelected}
                        isPlaying={Boolean(songsObj.isPlaying && isSelected)}
                    />
                })}
            </div>
        );
    };
}


export default MusicList;