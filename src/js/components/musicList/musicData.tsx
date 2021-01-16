import * as React from "react";
import {useCallback} from "react";
import {useSelector,useDispatch} from "react-redux";
import styled from "styled-components";
import { CurrentMusicType , Albumtype , MusicType } from "../../redux/reducer/musics";
import { currentMusic_set } from "../../redux/actions/dispatchMusics";

import {darken,lighten} from "polished";
import StateType from "../../redux/StateType";

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

const isCurrentMusic:(present:MusicType,current:CurrentMusicType)=>boolean = (present,current) => present?.path === current?.path ?? false;

const MusicData:(props:{title:string,artist:string,index:number,duration:number,albumIndex:number})=>JSX.Element = props=>{
    const dispatch = useDispatch();
    const currentMusicData = useSelector((state:StateType)=>state.currentMusic);
    const albums = useSelector((state:StateType)=>state.albumList);
    const clickOnList = useCallback(()=>{
        dispatch(currentMusic_set(albums[props.albumIndex].musics[props.index]));
    },[currentMusicData]);
    return(
        <MusicWrapper on={isCurrentMusic(albums[props.albumIndex].musics[props.index],currentMusicData)} onClick={clickOnList}>
            <th>{props.title}</th>
            <th>{props.artist}</th>
            <th>{props.duration}</th>
        </MusicWrapper>
    )
}

export default MusicData;
