import styled,{css} from "styled-components";
import {rgba,darken,saturate,setHue} from "polished";

export const shineStyle = css<{color:string}>`
    box-shadow:0px 0px 3px 3px ${props=>rgba(props.color,0.4)};
    border: 1px solid ${props=> props.color};
    transition: .3s linear;
`;

export const shineSVG = css<{color:string}>`
    filter: drop-shadow(0px 0px 3px 3px ${props=>rgba(props.color,0.4)});
    stroke:${props=> props.color};
    cursor: pointer;
    padding: 2px;
    margin-right:3px;
    transition: .3s linear;
`;

export const centerPlaced = css<{add?:string,y?:number,x?:number}>`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: ${props=> `translate(${props.x || "-50"}%,${props.y || "-50"}%)` + (props.add || "")};
`;

export const smallTitle = css<{color:string}>`
    color: ${props=> props.color};
    font-size:15px;
    font-weight:300;
    text-shadow:0px 0px 5px ${props=>rgba(props.color,0.8)};
    transition: .3s linear;
`;

export const playListTitle = css<{color:string}>`
    background: linear-gradient(${props=>props.color},${props=>darken(0.3,props.color)});
    -webkit-background-clip:text;
    color: transparent;
    font-weight:800;
    text-shadow: 2px 2px 6px rgba(0,0,0,0.4);
`;