import * as React from "react";
import { useCallback } from "react";
import {useSelector,useDispatch} from "react-redux";
import StateType from "../../redux/StateType";
import {DndProvider,DropTargetMonitor,useDrop} from "react-dnd";
import {HTML5Backend, NativeTypes} from "react-dnd-html5-backend";
import { album_add } from "../../redux/actions/dispatchMusics";
import { getAlbumAndMusics } from "../../fileSystem/handleMusicFiles";

import MusicList from "./listContainer";

export type DropFunc = (monitor:DropTargetMonitor)=>void;

const MusicListContainer = () =>{
    const dispatch = useDispatch();
    const albums = useSelector((state:StateType)=>state.albumList);
    const handleFolderDrop:DropFunc = useCallback(monitor=>{
        if(monitor){
            const dropped:any[] = monitor.getItem().files;
            console.log(dropped);
            (async()=>{
                const musics = await Promise.allSettled(dropped.map(async(m)=>{
                    return  await getAlbumAndMusics(m.path);
                }));
                console.log(musics);
                const albumList = musics.filter(m=> m.status === "fulfilled").map((r:any) => r.value);
                if(albumList[0]===false)return;
                dispatch(album_add(albumList));
            })();
        }
    },[albums]);
    return(
        <DndProvider backend={HTML5Backend}>
            <MusicList onDrop={handleFolderDrop}/>
        </DndProvider>
    )
}
export default MusicListContainer;