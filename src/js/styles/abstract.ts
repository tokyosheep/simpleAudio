import styled,{ css } from "styled-components";

export const centerPlaced = css<{add?:string,y?:number,x?:number}>`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: ${props=> `translate(${props.x || "-50"}%,${props.y || "-50"}%)` + (props.add || "")};
`;