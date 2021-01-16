import { UiColorAction } from "../reducer/common";

export const uiColor_set:(color:string)=>UiColorAction = color =>{
    return{type:"uiColor_set",color:color};
}