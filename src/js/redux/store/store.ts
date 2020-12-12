import {musics,volume,currentMusic,playOptions,audioObjShare,isPaused,spectrumType,backGroundPath,mainColor,settingsMonitor} from "../reducer/index";
import {combineReducers,createStore} from "redux";

const RootReducer = combineReducers({
    musics,
    volume,
    currentMusic,
    playOptions,
    audioObjShare,
    isPaused,
    spectrumType,
    backGroundPath,
    mainColor,
    settingsMonitor
});

const configStore = () => createStore(RootReducer);

export default configStore;