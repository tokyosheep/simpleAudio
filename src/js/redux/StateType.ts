import { Albumtype , CurrentMusicType , PlayListType } from "./reducer/musics";
import { AudioType } from "../audio/audioObj";
import { PlayingOption } from "./reducer/audio";
import { BgSet } from "./reducer/label";
import { FilterTypes } from "./reducer/filter";
import { WindowType , ModeWindow } from "./reducer/window";

type StateType = {
    albumList:Albumtype[],
    background:string,
    uiColor:string,
    currentMusic:CurrentMusicType,
    audioObject:HTMLAudioElement,
    volume:number,
    isPaused:boolean,
    playOptions:PlayingOption,
    videoPath:string,
    visualSetiing:BgSet,
    filterData:FilterTypes,
    windowSize:WindowType,
    modeWindow:ModeWindow,
    playList:PlayListType[]
}

export default StateType;