const initAudio = new Audio();
export type AudioAction = {type:"audio_set",audio:HTMLAudioElement};
type AudioReducer = (state:HTMLAudioElement,action:AudioAction)=>HTMLAudioElement;

export const audioObject:AudioReducer = (state=initAudio,action)=>{
    switch(action.type){
        case "audio_set":
            return action.audio;

        default:
            return state;
    }
}

const initVolume = 0.2;
export type VolumeAction = {type:"volume_set",volume:number};
type VolumeType = (state:number,action:VolumeAction)=>number;

const setMinAndMaxValue :(num:number)=>number = num => num > 1 ? 1.0 : num < 0 ? 0.0 : num;

export const volume:VolumeType = (state=initVolume,action)=>{
    switch(action.type){
        case "volume_set":
            return setMinAndMaxValue(action.volume);

        default:
            return state;
    }
}

const initPaued = true;
export type PausedAction = {type:string,paused:boolean};
export type PausedFunc = (state:boolean,action:PausedAction)=>boolean;

export const isPaused:PausedFunc = (state=initPaued,action)=>{
    switch(action.type){
        case "paused_set":
            return action.paused;

        default:
            return state;
    }
}

export type PlayingOption = {
    [key:string]:boolean,
    repeat:boolean,
    succession:boolean,
    shuffle:boolean,
    noOption:boolean
};

const initOption:PlayingOption = {
    repeat:false,
    succession:true,
    shuffle:false,
    noOption:false
};

export type PlayOptionAction = {type:"playOption_set",prop:string,value:boolean};
export type PlayOptionReducer = (state:PlayingOption,action:PlayOptionAction)=>PlayingOption;

export const playOptions:PlayOptionReducer = (state=initOption,action) =>{
    switch(action.type){
        case "playOption_set":
            const options = {...state};
            Object.keys(options).forEach(key=> options[key] = false);
            options[action.prop] = action.value;
            return options;

        default:
            return state;
    }
}