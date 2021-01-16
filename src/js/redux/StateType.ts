import { Albumtype , CurrentMusicType } from "./reducer/musics";
import { AudioType } from "../audio/audioObj";

type StateType = {
    albumList:Albumtype[],
    background:string,
    uiColor:string,
    currentMusic:CurrentMusicType,
    audioObject:AudioType
}

export default StateType;