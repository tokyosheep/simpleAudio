import {musics,volume,currentMusic} from "../reducer/index";
import {combineReducers,createStore} from "redux";

const RootReducer = combineReducers({
    musics,
    volume,
    currentMusic
});

const configStore = () => createStore(RootReducer);

export default configStore;