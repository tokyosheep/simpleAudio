import * as React from "react";
import styled from "styled-components";
import {centerPlaced} from "../../styles/abstract";
import {mainBlue,shineStyle} from "../../styles/commonColor"; 
const Circle = styled.div.attrs<{size?:number}>(props=>({
    size: props.size || 20,
}))<{size:number}>`
    width: ${props=> props.size}px;
    height: ${props=> props.size}px;
    position: relative;
    border-radius: 50%;
    ${shineStyle}
`;

const ArrowButton = styled.div`
    ${centerPlaced}
    width: 10px;
    height: 10px;
    border-top: 1px solid ${mainBlue};
    border-right: 1px solid ${mainBlue};
    cursor: pointer;
`;

const SquareButton = styled.div`
    ${centerPlaced}
    width: 10px;
    height: 10px;
    border: 1px solid ${mainBlue};
    cursor: pointer;
`;

export const StopButton = () =>{
    return(
        <Circle size={30}>
            <SquareButton></SquareButton>
        </Circle>
    )
}


export const PlatyButton = () =>{
    return(
        <Circle size={30}>
            <ArrowButton X={-70} add={"rotate(45deg)"}></ArrowButton>
        </Circle>
    )
}
