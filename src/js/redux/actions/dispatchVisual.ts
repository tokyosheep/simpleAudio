import { BackgroungAction , VideoAction , BgSet , BgAction } from "../reducer/label";

export const picture_set:(path:string)=>BackgroungAction = path =>{
    return{type:"background_set",img:path};
}

export const video_set:(video:string)=>VideoAction = video =>{
    return {type:"video_set",video:video}
}

export const visualSetting_set:(prop:string,checked:boolean)=>BgAction = (prop,checked) =>{
    return{type:"visual_set",prop:prop,checked:checked}
}