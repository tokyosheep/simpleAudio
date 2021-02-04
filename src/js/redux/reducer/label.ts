
const initBackGround = "./image/convert.jpg";

export type BackgroungAction = {type:"background_set",img:string};
type BackgroundReducer = (state:string,action:BackgroungAction)=>string;

export const background:BackgroundReducer = (state=initBackGround,action)=>{
    switch(action.type){
        case "background_set":
            return action.img;

        default:
            return state;
    }
}

const initVideo = "";
export type VideoAction = {type:"video_set",video:string};
type VideoReducer = (state:string,action:VideoAction)=>string;

export const videoPath:VideoReducer = (state=initVideo,action)=>{
    switch(action.type){
        case "video_set":
            return action.video;

        default:
            return state;
    }
}

export type BgSet = {
    [key:string]:boolean,
    video:boolean,
    picture:boolean
};

const initBgSet:BgSet = {
    video:false,
    picture:true
};

export type BgAction = {type:"visual_set",prop:string,checked:boolean};
type BgReducer =( state:BgSet,action:BgAction)=>BgSet;

export const visualSetiing:BgReducer = (state=initBgSet,action)=>{
    switch(action.type){
        case "visual_set":
            const bg = {...state};
            Object.keys(bg).forEach(key=> bg[key] = false);
            bg[action.prop] = action.checked;
            return bg;

        default:
            return state;
    }
}