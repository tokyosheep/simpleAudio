import * as React from "react";
import styled from "styled-components";
import {useSelector,useDispatch} from "react-redux";
import StateType from "../../../../redux/StateType";
import { darken } from "polished";

const ButtonBlock = styled.button<{color:string}>`
    width: auto;
    height: 20px;
    padding: 2px 10px;
    border-radius:5px;
    border: 1px solid #000;
    background: linear-gradient(${props=>props.color},${props=>darken(0.3,props.color)});
    color: #000;
    cursor: pointer;
    &:focus{
        outline:none;
    }
    &:active{
        background: linear-gradient(${props=>darken(0.3,props.color)},${props=>darken(0.6,props.color)});
    }
`;

type PlayListButtonType = (props:{name:string,func:()=>void})=>JSX.Element;

const PlayListButton:PlayListButtonType = ({name,func}) =>{
    const uiColor = useSelector((state:StateType)=>state.uiColor);
    return(
        <ButtonBlock color={uiColor} onClick={func}>{name}</ButtonBlock>
    )
}

export default PlayListButton;

const OffButton = styled.button<{color:string}>`
    width: auto;
    height: 20px;
    padding: 2px 10px;
    border-radius:5px;
    border: 1px solid #000;
    background: linear-gradient(rgb(40,40,40),rgb(0,0,0));
    color: ${props=>props.color};
    font-size: 300;
    cursor: pointer;
    &:focus{
        outline:none;
    }
    &:active{
        background: linear-gradient(rgb(20,20,20),rgb(0,0,0));
    }
`;

export const OffPlayListButton:PlayListButtonType = ({name,func}) =>{
    const uiColor = useSelector((state:StateType)=>state.uiColor);
    return(
        <OffButton color={uiColor} onClick={func}>{name}</OffButton>
    )
}