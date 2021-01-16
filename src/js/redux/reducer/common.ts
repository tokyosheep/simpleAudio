const initColor = "#559ae0"; 

export type UiColorAction = {type:"uiColor_set",color:string};
type UiColorReducer = (state:string,action:UiColorAction)=>string;

export const uiColor:UiColorReducer = (state=initColor,action)=>{
    switch(action.type){
        case "uiColor_set":
            return action.color;

        default:
            return state;
    }
}