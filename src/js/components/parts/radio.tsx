import * as React from "react";
import styled from "styled-components";
import {textShadow} from "../../styles/commonColor";
import {centerPlaced} from "../../styles/abstract";
import {darken} from "polished";
import {CheckBox} from "./type";

const SettingRadio = styled.label.attrs<{color:string,on:boolean}>(props=>({
    color: props.on ? props.color : darken(0.2,props.color),
}))<{color:string,on:boolean}>`
    display: block;
    padding: 3px;
    border: 1px solid ${props=>props.color};
    box-shadow:${props=>textShadow(props.color)};
    border-radius: 5px;
    position: relative;
    input[type="radio"]{
        display: none;
    }
    span{
        color:${props=>props.color};
        text-shadow:${props=>textShadow(props.color)};
    }
`;



export const ShineRadio = ({checked,name,arg,func}:CheckBox<{color:string}>) =>{
    return(
        <SettingRadio on={checked} color={arg?.color ?? "#fff" } >
            <input type="radio" checked={checked} name={name} onChange={func}/>
            <span>{name}</span>
        </SettingRadio>
    )
}