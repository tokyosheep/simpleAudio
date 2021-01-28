import * as React from "react";
import { useCallback } from "react";
import {useSelector,useDispatch} from "react-redux";
import styled from "styled-components";
import StateType from "../../../../redux/StateType";
import { windowMode_set } from "../../../../redux/actions/dispatchWIndow";
import PlayListButton,{ OffPlayListButton } from "./playListButton";

const ButtonWrapper = styled.div`
    width: 80%;
    padding: 5px;
    display: flex;
    justify-content:space-between;
`;

const PlayHeaderButtons = () =>{
    const dispatch = useDispatch();
    const modeWindow = useSelector((state:StateType)=>state.modeWindow);
    const addPlayList = useCallback(()=>{},[]);
    const removePlayList = useCallback(()=>{},[]);
    const offPlayList = useCallback(()=>dispatch(windowMode_set(false,"setPlayList")),[modeWindow]);
    return(
        <ButtonWrapper>
            <PlayListButton name="add playList" func={addPlayList}></PlayListButton>
            <PlayListButton name="remove playList" func={removePlayList}></PlayListButton>
            <OffPlayListButton name="off" func={offPlayList}></OffPlayListButton>
        </ButtonWrapper>
    )
}

export default PlayHeaderButtons;