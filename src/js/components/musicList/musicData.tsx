import * as React from "react";
import {useCallback} from "react";
import {useSelector,useDispatch} from "react-redux";
import styled from "styled-components";
import { paused_set } from "../../redux/actions/dispatchAudio";
import { currentMusic_set , album_setIndex } from "../../redux/actions/dispatchMusics";
import { playList_setMusicIndex } from "../../redux/actions/dispatchPlayList";

import StateType from "../../redux/StateType";
import { setMinuteTime } from "../../fileSystem/timeConvert";

const MusicWrapper = styled.tr<{on:boolean}>`
    width: 100%;
    height: 20px;
    background: ${props=> props.on  ? "rgb(50,50,50)" : "rgb(20,20,20)"};
    cursor: pointer;
    color: #fff;
    &:hover{
        background: rgb(40,40,40);
    }
`;


const MusicData:(props:{title:string,artist:string,index:number,duration:number,albumIndex:number})=>JSX.Element = props=>{
    const dispatch = useDispatch();
    const currentMusicData = useSelector((state:StateType)=>state.currentMusic);
    const albums = useSelector((state:StateType)=>state.albumList);
    const clickOnList = useCallback(()=>{
        dispatch(paused_set(true));
        dispatch(currentMusic_set(albums[props.albumIndex].musics[props.index]));
        dispatch(album_setIndex(props.albumIndex,props.index))
    },[currentMusicData]);
    return(
        <MusicWrapper on={albums[props.albumIndex].musics[props.index].selected} onClick={clickOnList}>
            <th>{props.title}</th>
            <th>{props.artist}</th>
            <th>{setMinuteTime(props.duration)}</th>
        </MusicWrapper>
    )
}

export default MusicData;

export const PlayListData:(props:{title:string,artist:string,index:number,duration:number})=>JSX.Element = props =>{
    const dispatch = useDispatch();
    const playlist = useSelector((state:StateType)=>state.playList);
    const currentList = playlist.find(p=> p.selected);
    const clickOnList = useCallback(()=>{
        dispatch(paused_set(true));
        dispatch(playList_setMusicIndex(props.index));
        dispatch(currentMusic_set(currentList?.musics[props.index] ?? null ));
    },[playlist]);
    return(
        <MusicWrapper on={currentList?.currentMusicIndex === props.index ?? false} onClick={clickOnList}>
            <th>{props.title}</th>
            <th>{props.artist}</th>
            <th>{setMinuteTime(props.duration)}</th>
        </MusicWrapper>
    )
}
