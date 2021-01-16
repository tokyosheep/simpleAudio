import { AudioObject , AudioType } from "../../audio/audioObj";

const initAudio = new AudioObject();
type AudioAction = {type:string,audio:AudioType};
type AudioReducer = (state:AudioType,action:AudioAction)=>AudioType;

export const audioObject:AudioReducer = (state=initAudio,action)=>{
    switch(action.type){
        case "audio_set":
            return action.audio;

        default:
            return state;
    }
}