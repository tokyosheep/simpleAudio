import * as React from "react";
import styled,{ keyframes } from "styled-components";
import { centerPlaced } from "../styles/mixin";

const rotating = keyframes`
    from{
        transform: translate(-50%,-50%) rotate(0deg);
    }
    to{
        transform: translate(-50%,-50%) rotate(360deg);
    }
`;

const LoadingCircle = styled.div<{size:number,direction?:string}>`
    width: ${props=> props.size}px;
    height: ${props=> props.size}px;
    border-radius: 50%;
    border-width: 5px;
    border-style: solid;
    border-color: ${props=> props.direction  === "right" ? "#fff #fff #fff transparent" : "#fff #fff transparent #fff"};
    ${centerPlaced};
    z-index: 30;
    animation:${rotating} 1.3s linear infinite;
`;

const Fading = keyframes`
    0%{
        opacity: 0.3;
    }

    50%{
        opacity: 1;
    }

    100%{
        opacity: 0.3;
    }
`;

const Texts = styled.div<{y:number}>`
    color: #fff;
    font-weight: 300;
    font-size: 20px;
    ${centerPlaced};
    animation:${Fading} 1.3s linear infinite;
`;

const Loading = () =>{
    return(
        <>
            <LoadingCircle size={70} direction="right"></LoadingCircle>
            <LoadingCircle size={100}></LoadingCircle>
            <Texts y={330}>Loading...</Texts>
        </>
    )
}

export default Loading;