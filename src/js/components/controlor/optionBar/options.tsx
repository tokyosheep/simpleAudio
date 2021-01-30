import * as React from "react";
import { useCallback } from "react";
import styled,{ css } from "styled-components";
import { useSelector , useDispatch } from "react-redux";
import { playOptions_set } from "../../../redux/actions/dispatchAudio";
import StateType from "../../../redux/StateType";
import { darken } from "polished";

import { FiRepeat, FiArrowRight , FiShuffle , FiMinus } from "react-icons/fi";
import { shineSVG , centerPlaced } from "../../../styles/mixin";

const optionsButton = css<{color:string,on:string}>`
    ${centerPlaced}
    ${shineSVG}
    stroke:${props=> props.on === "true" ? props.color : darken(0.3,props.color)};
    transition: .3s linear;
    width: 20px;
    height: 20px;
`;

const ButtonWrapper = styled.div`
    width: 30%;
    height: 100%;
    background: linear-gradient(rgba(30,30,30,1),rgba(0,0,0,1));
    position: relative;
`;

const Repeat = styled(FiRepeat)<{color:string,on:string}>`
    ${optionsButton}
`;

const SuccessionIcon = styled(FiArrowRight)<{color:string,on:string}>`
    ${optionsButton}
`;

const ShuffleIcon = styled(FiShuffle)<{color:string,on:string}>`
    ${optionsButton}
`;

const NoOption = styled(FiMinus)<{color:string,on:string}>`
    ${optionsButton}
`;

const OptionWrapper = styled.div`
    display: flex;
    justify-content:space-around;
    //background: #000;
    height: 30px;
    width: 200px;
    margin-bottom: 10px;
`;

const getIconElm:(color:string,key:string,value:string,func:(key:string,value:string)=>void)=>JSX.Element = (color,key,value,func) =>{
    switch(key){
        case "repeat":
            return <Repeat color={color} on={value} onClick={()=>func(key,value)}></Repeat>;

        case "succession":
            return <SuccessionIcon color={color} on={value} onClick={()=>func(key,value)}></SuccessionIcon>;

        case "shuffle":
            return <ShuffleIcon color={color} on={value} onClick={()=>func(key,value)}></ShuffleIcon>;

        case "noOption":
            return <NoOption color={color} on={value} onClick={()=>func(key,value)}></NoOption>

        default:
            return <div></div>;
    }
}

const OptionBars = () =>{
    const dispatch = useDispatch();
    const options = useSelector((state:StateType)=>state.playOptions);
    const uiColor = useSelector((state:StateType)=>state.uiColor);
    const handleOptionsButton = useCallback((key:string,value:string)=>{
        dispatch(playOptions_set(key,(value === "false" ? true : false)));
    },[options]);
    console.log(options);
    const icons = Object.entries(options).map(([key,value])=>{
        return(
            <ButtonWrapper key={key}>
                {getIconElm(uiColor,key,String(value),handleOptionsButton)}
            </ButtonWrapper>
        )
    });
    return(
        <OptionWrapper>
            {icons}
        </OptionWrapper>
    )
}

export default OptionBars;