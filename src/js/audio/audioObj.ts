export interface AudioType{
    //audio:HTMLAudioElement;
    setMusic:(url:string)=>void;
    playMusic:()=>void;
    stopMusic:()=>void;
    currentTime:number;
    isPause:boolean;
    duration:number;
}

export class AudioObject implements AudioType{
    private _audio:HTMLAudioElement;
    constructor(){
        this._audio = new Audio();
    }

    setMusic(url:string){
        try{
            this._audio.src = url;
        }catch(e){
            alert(e);
        }finally{
            this._audio.currentTime = 0;
        }
    }

    playMusic(){
        if(this._audio.src === "" || this._audio.src === undefined )return;
        if(this._audio.paused){
            this._audio.play.bind(this._audio)();
        }else{
            this._audio.pause.bind(this._audio)();
        }
    }

    get isPause(){
        return this._audio.paused;
    }

    stopMusic(){
        this._audio.currentTime = 0;
        this._audio.pause.bind(this._audio)();
        this._audio.src = "";
    }

    set currentTime(time:number){
        this._audio.currentTime = time;
    }

    get currentTime(){
        return this._audio.currentTime;
    }

    get duration(){
        return this._audio.duration;
    }
}