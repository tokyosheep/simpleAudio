import { FilterAction } from "../reducer/filter";

type FilterDispatch = (value:number)=>FilterAction;

export const blur_set:FilterDispatch = value => ({type:"blur_set",value:value});
export const contrast_set:FilterDispatch = value => ({type:"contrast_set",value:value});
export const curtain_set:FilterDispatch = value => ({type:"curtain_set",value:value}); 