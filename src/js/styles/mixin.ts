import styled,{css} from "styled-components";
import {rgba,darken} from "polished";

export const shineStyle = css<{color:string}>`
    box-shadow:0px 0px 3px 3px ${props=>rgba(props.color,0.4)};
    border: 1px solid ${props=> props.color};
`;

export const shineSVG = css<{color:string}>`
    filter: drop-shadow(0px 0px 3px 3px ${props=>rgba(props.color,0.4)});
    stroke:${props=> props.color};
    cursor: pointer;
    padding: 2px;
    margin-right:3px;
`;

export const centerPlaced = css<{add?:string,y?:number,x?:number}>`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: ${props=> `translate(${props.x || "-50"}%,${props.y || "-50"}%)` + (props.add || "")};
`;