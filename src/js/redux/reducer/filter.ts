interface FilterType{
    value:number,
    max:number,
    step:number,
    name:string,
    color:string
}

class FilterClass implements FilterType{
    constructor(
        public value:number,
        public max:number,
        public step:number,
        public name:string,
        public color:string
    ){

    }
}

type ActionType<T> = {type:T,value:number};
export type FilterTypes = {
    [key:string]:FilterClass,
    blur:FilterClass,
    contrast:FilterClass,
    curtain:FilterClass
}
const initFilter:FilterTypes = {
    blur:new FilterClass(0,10,1,"blur","#2389ae"),
    contrast:new FilterClass(5,10,1,"contrast","#89ae45"),
    curtain:new FilterClass(0,1,0.1,"curtain","#aeaa67")
};

const setFilterValue:(state:FilterTypes,value:number,prop:string)=>FilterTypes = (state,value,prop)=>{
    const stat = {...state};
    stat[prop] = {...stat[prop]};
    stat[prop].value = value;
    return stat;
}

export type FilterAction = ActionType<"blur_set">|ActionType<"contrast_set">|ActionType<"curtain_set">;
type FilterReducer = (state:FilterTypes,action:FilterAction)=>FilterTypes;

export const filterData:FilterReducer = (state=initFilter,action)=>{
    switch(action.type){
        case "blur_set":
            return setFilterValue(state,action.value,"blur");

        case "contrast_set":
            return setFilterValue(state,action.value,"contrast");

        case "curtain_set":
            return setFilterValue(state,action.value,"curtain");

        default:
            return state;
    }
}
