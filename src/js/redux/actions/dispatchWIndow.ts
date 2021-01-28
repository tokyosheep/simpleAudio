import { WindowType , WindowAction , ModeAction } from "../reducer/window";

export const window_set:(numbers:WindowType)=>WindowAction = numbers => ({type:"window_set",numbers:numbers});

export const windowMode_set:(on:boolean,prop:string)=>ModeAction = (on,prop) => ({type:"modeWin_set",on:on,prop:prop});