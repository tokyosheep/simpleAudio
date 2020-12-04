import styled,{ css } from "styled-components";

export const centerPlaced = css<{add?:string,Y?:number,X?:number}>`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: ${props=> `translate(${props.X || "-50"}%,${props.Y || "-50"}%)` + (props.add || "")};
`;