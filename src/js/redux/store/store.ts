import { combineReducers , createStore } from "redux";

import { albumList , currentMusic } from "../reducer/musics";
import { background } from "../reducer/label";
import { uiColor } from "../reducer/common";
import { audioObject } from "../reducer/audio";

const rootReducer = combineReducers({
    albumList,
    background,
    uiColor,
    currentMusic,
    audioObject
});

const configStore = () => createStore(rootReducer);

export default configStore;