import * as React from "react";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import StateType from "../redux/StateType";
import {ipcRenderer} from "electron";


const useRecord = () =>{
    const playList = useSelector((state:StateType)=>state.playList);
    const albums = useSelector((state:StateType)=>state.albumList);

    useMemo(()=>{
        (async()=>{
            try{
                if(albums.length < 1 && playList.length < 2 && playList[0].musics.length < 1 && playList[0].name === "playlist"){
                    return;/* 音楽データが初期状態だったらデータベースに記録しない */
                }
                await ipcRenderer.invoke("recoredAll",{albums:albums,playList:playList});
            }catch(e){
                console.log(e);
            }
        })();
    },[playList,albums]);
    return;
}

export default useRecord;