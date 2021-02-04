import * as React from "react";
import { useState , useCallback } from "react";
import styled from "styled-components";
import {useSelector,useDispatch} from "react-redux";
import { playList_add } from "../redux/actions/dispatchPlayList";
import {  windowMode_set } from "../redux/actions/dispatchWIndow";
import StateType from "../redux/StateType";
import { darken } from "polished";

import { centerPlaced , playListTitle } from "../styles/mixin";


const FillWrapper = styled.div`
    width: 400px;
    height: 150px;
    padding: 5px;
    box-sizing: border-box;
    z-index: 5;
    ${centerPlaced}
    background: linear-gradient(rgb(40,40,40),rgb(70,70,70),rgb(50,50,50));
    border-radius: 10px;
    display: grid;
    place-items:center;
`;

const TextForm = styled.input`
    width: 200px;
    height: 20px;
    background: #888;
    border: 1px solid #000;
    border-radius: 5px;
    box-shadow:0px 0px 3px 3px rgba(0,0,0,0.2) inset;
    color: #fff;
    font-weight: 200;
    &:focus{
        outline:none;
    }
`;

const ButtonWarapper = styled.div`
    margin-top: 10px;
    width: 100%;
    display: flex;
    justify-content:space-around;
`;

const FormTitle = styled.h2<{color:string}>`
    ${playListTitle}
    margin: 5px;
`;

const Button = styled.button<{color:string}>`
    width: 80px;
    height: 30px;
    border: 1px solid #000;
    background: linear-gradient(${props=>props.color},${props=>darken(0.3,props.color)});
    color: #000;
    cursor: pointer;
    box-shadow:0px 0px 3px 3px rgba(0,0,0,0.3) inset;
    &:focus{
        outline:none;
    }
    &:active{
        background: linear-gradient(${props=>darken(0.3,props.color)},${props=>darken(0.6,props.color)});
    }
`;


const FillPlayListName = () =>{
    const fillPlayListName = useSelector((state:StateType)=>state.modeWindow.fillPlayListName);
    const dispatch = useDispatch();
    const uiColor = useSelector((state:StateType)=>state.uiColor);
    const [playName,setPlayName] = useState("");
    const handleWindowOff = useCallback(()=>dispatch(windowMode_set(false,"fillPlayListName")),[fillPlayListName]);
    const handleAddPlayList = (name:string)=>{
        dispatch(playList_add(name));
        dispatch(windowMode_set(false,"fillPlayListName"));
    };
    return(
        <FillWrapper>
            <FormTitle color={uiColor}>fill your play list name</FormTitle>
            <TextForm type="text" value={playName} onChange={(e)=>setPlayName(e.target.value)}></TextForm>
            <ButtonWarapper>
                <Button color={uiColor} onClick={()=>handleAddPlayList(playName)}>add name</Button>
                <Button color={uiColor} onClick={handleWindowOff}>cancel</Button>
            </ButtonWarapper>
        </FillWrapper>
    )
}

export default FillPlayListName;