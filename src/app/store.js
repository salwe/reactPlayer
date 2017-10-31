import { createStore } from "redux";

import { sounds } from "./reducers/soundReducers";


export const store = createStore(sounds);