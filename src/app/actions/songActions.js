export const ADD_SONG = 'ADD_SONG';
export const PLAY_SONG = 'PLAY_SONG';
export const PAUSE_SONG = 'PAUSE_SONG';
export const STOP_SONG = 'STOP_SONG';
export const CHANGE_PLAY = 'CHANGE_PLAY';

let songId = 0;

export const addSong = (info) => ({
    type: ADD_SONG,
    id: songId++,
    ...info
});

export const playSong = (id) => ({
    type: PLAY_SONG,
    id
});

export const stopSong = (id) => ({
    type: STOP_SONG,
    id
});

export const changePlay = (id) => ({
    type: CHANGE_PLAY,
    id
});
