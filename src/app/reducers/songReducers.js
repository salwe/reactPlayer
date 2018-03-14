import { ADD_SONG, PLAY_SONG, STOP_SONG, CHANGE_PLAY } from '../actions/songActions';

const initSongData = {
    id: -1,
    duration: 0,
    currTime: 0
};

const initState = {
    currentSong: -1,
    isPlaying: false,
    songArray: []
};

export const songsObj = (state = initState, action) => {
    switch (action.type) {
        case ADD_SONG:
            return {
                currentSong: -1,
                isPlaying: false,
                songArray: [
                    ...state.songArray,
                    {
                        id: action.id,
                        ...action.song
                    }]
            };
            
        case PLAY_SONG:
            return {
                currentSong: action.id,
                isPlaying: true,
                songArray: state.songArray
            };

        case STOP_SONG:
            return {
                currentSong: action.id,
                isPlaying: false,
                songArray: state.songArray
            };

        // case CHANGE_PLAY:
        //     const isNewSong = state.currentSong === action.id;
        //     return {
        //         currentSong: isNewSong ? state.songArray[action.id] : state.currentSong,
        //         isPlaying: isNewSong ? true : !state.isPlaying,
        //         songArray: state.songArray
        //     };

        case CHANGE_PLAY:
            return {
                currentSong: action.id || state.currentSong,
                isPlaying: !state.isPlaying,
                songArray: state.songArray
            };

        default:
            return state;
    }
};