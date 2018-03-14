import { createStore } from "redux";

import { songsObj } from "./reducers/songReducers";


export const store = createStore(songsObj);