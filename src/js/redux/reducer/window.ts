const initWindowSize = [0,0];
export type WindowType = number[];
export type WindowAction = {type:"window_set",numbers:WindowType};
export type WindowReducer = (state:WindowType,action:WindowAction)=>WindowType;

export const windowSize:WindowReducer = (state=initWindowSize,action)=>{
    switch(action.type){
        case "window_set":
            return action.numbers;

        default:
            return state;
    }
} 

export type ModeWindow = {
    [key:string]:boolean,
    setting:boolean,
    playlist:boolean,
    setPlayList:boolean,
    fillPlayListName:boolean,
    loading:boolean
}

const initModeWindow:ModeWindow = {
    setting:false,
    playlist:false,
    setPlayList:false,
    fillPlayListName:false,
    loading:false
}

export type ModeAction = {type:"modeWin_set",on:boolean,prop:string};
type ModeWinReducer = (state:ModeWindow,action:ModeAction)=>ModeWindow;

export const modeWindow:ModeWinReducer = (state=initModeWindow,action)=>{
    switch(action.type){
        case "modeWin_set":
            const stat = {...state};
            stat[action.prop] = action.on;
            return stat;

        default:
            return state;
    }
}