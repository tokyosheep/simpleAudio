import * as React from "react";
import { useCallback } from "react";
import {useSelector,useDispatch} from "react-redux";
import styled from "styled-components";
import StateType from "../../../../redux/StateType";
import { windowMode_set } from "../../../../redux/actions/dispatchWIndow";
import { playList_remove } from "../../../../redux/actions/dispatchPlayList";
import PlayListButton,{ OffPlayListButton } from "./playListButton";
import { currentMusic_set } from "../../../../redux/actions/dispatchMusics";

const ButtonWrapper = styled.div`
    width: 80%;
    padding: 5px;
    display: flex;
    justify-content:space-between;
`;

const PlayHeaderButtons = () =>{
    const dispatch = useDispatch();
    const modeWindow = useSelector((state:StateType)=>state.modeWindow);
    const playList = useSelector((state:StateType)=>state.playList);
    const albums = useSelector((state:StateType)=>state.albumList);
    const removePlayList = useCallback(()=>dispatch(playList_remove()),[playList]);
    const offPlayList = useCallback(()=>{
        dispatch(windowMode_set(false,"setPlayList"))
        if(modeWindow.playlist){
            const selectedListMusic = playList.find(p=> p.selected === true);
            console.log(selectedListMusic);
            if(selectedListMusic===undefined)return;
            dispatch(currentMusic_set(selectedListMusic.musics[selectedListMusic.currentMusicIndex]));
        }else{
            console.log("switch");
            const selectedMusic = albums.find(a=> a.selected===true)?.musics.find(m=> m.selected === true);
            console.log(selectedMusic);
            if(selectedMusic===undefined)return;
            dispatch(currentMusic_set(selectedMusic));
        }
    },[modeWindow]);
    const handleWindow = useCallback(()=>dispatch(windowMode_set(true,"fillPlayListName")),[modeWindow.fillPlayListName]);
    return(
        <ButtonWrapper>
            <PlayListButton name="add playList" func={handleWindow}></PlayListButton>
            <PlayListButton name="remove playList" func={removePlayList}></PlayListButton>
            <OffPlayListButton name="off" func={offPlayList}></OffPlayListButton>
        </ButtonWrapper>
    )
}

export default PlayHeaderButtons;