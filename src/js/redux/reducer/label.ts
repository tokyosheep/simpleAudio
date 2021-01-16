
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