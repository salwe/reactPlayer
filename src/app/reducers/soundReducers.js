import { ADD_SOUND, PLAY_SOUND } from "../actions/soundActions";

var initState = {
    currentSound: {},
    soundArray: []
};

export const sounds = (state = initState, action) => {
    switch (action.type) {
        case ADD_SOUND:
            console.log(state);
            return {
                currentSound: {},
                soundArray: [
                    ...state.soundArray,
                    {
                        id: action.id,
                        ...action.sound
                    }]
            };
        case PLAY_SOUND:
            return {
                currentSound: new Audio(action.src),
                ...state.soundArray
            };
        default:
            return state;
    }
};