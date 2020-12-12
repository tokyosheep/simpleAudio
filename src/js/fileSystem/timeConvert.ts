type Minute = {min:number,sec:number};

export const setToMin:(time:number)=>Minute = time =>{
    const min = Math.floor(time/60);
    const sec = Math.floor(time % 60);
    return{
        min:min,
        sec:sec
    }
}

export const convertText:(minute:Minute)=>string = minute =>{
    return `${String(minute.min).padStart(2,"0")}:${String(minute.sec).padStart(2,"0")}`;
}

export const setMinuteTime:(time:number)=>string = time => convertText(setToMin(time));