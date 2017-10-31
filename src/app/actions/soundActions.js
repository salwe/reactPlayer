export const ADD_SOUND = "ADD_SOUND";
export const PLAY_SOUND = "PLAY_SOUND";
export const PAUSE_SOUND = "PAUSE_SOUND";
export const STOP_SOUND = "STOP_SOUND";

let soundId = 0;

export const addSound = (info) => ({
    type: ADD_SOUND,
    id: soundId++,
    ...info
});
export const playSound = (src) => ({
    type: PLAY_SOUND,
    src: src
});
