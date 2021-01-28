import { combineReducers , createStore } from "redux";

import { albumList , currentMusic , playList } from "../reducer/musics";
import { background , videoPath , visualSetiing } from "../reducer/label";
import { uiColor } from "../reducer/common";
import { audioObject , volume , isPaused , playOptions } from "../reducer/audio";
import { filterData } from "../reducer/filter";
import { windowSize , modeWindow } from "../reducer/window";

const rootReducer = combineReducers({
    albumList,
    background,
    uiColor,
    currentMusic,
    audioObject,
    volume,
    isPaused,
    playOptions,
    videoPath,
    visualSetiing,
    filterData,
    windowSize,
    modeWindow,
    playList
});

const configStore = () => createStore(rootReducer);

export default configStore;