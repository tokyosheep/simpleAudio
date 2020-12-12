import * as React from "react";
import {useCallback} from "react";
import {useSelector,useDispatch} from "react-redux";
import {ReduceType} from "../redux/reducer/index";
import styled,{css} from "styled-components";
import {rgba,darken} from "polished";

export const mainBlue = "#559ae0"; 

export const shine = `0px 0px 3px 3px ${rgba(mainBlue,0.4)}`;
export const textShadow:(color:string)=>string = color => `0px 0px 2px 2px ${color} `;



export const shineStyle = css`
    box-shadow:${shine};
    border: 1px solid ${mainBlue};
`;

export const shineSVG = css`
    filter: drop-shadow(${shine});
    stroke:${mainBlue};
    cursor: pointer;
    padding: 2px;
    margin-right:3px;
`;

export const optionsButton = css<{on:string}>`
    ${shineSVG}
    stroke:${props=> props.on === "true" ? mainBlue : darken(0.3,mainBlue)};
    transition: .3s linear;
`;