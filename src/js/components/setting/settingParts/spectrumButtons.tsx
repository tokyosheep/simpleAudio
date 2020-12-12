import * as React from "react";
import {useCallback} from "react";
import styled,{css,StyledComponent} from "styled-components";
import {useSelector,useDispatch} from "react-redux";
import {setSpectrum} from "../../../redux/actions/mapDispatchToProps";
import {ReduceType} from "../../../redux/reducer/index";

import {textShadow} from "../../../styles/commonColor";
import {IconType} from "react-icons";
import {BsBarChartFill,BsBrightnessLow} from "react-icons/bs";
import {darken} from "polished";

import {Head} from "./commonTitle";

const SpectrumContainer = styled.div`
    width: 100%;
    padding: 10px;
`;

const RadioWrapper = styled.ul`
    list-style: none;
    padding: 0;
    display: flex;
    justify-content:space-around;
`;

const RadioButton = styled.label`
    padding: 5px;
    border: 1px solid #fff;
`;

const IconRadioButton = styled.label.attrs<{color:string,on:boolean}>(props=>({
    color: props.on ? props.color : darken(0.2,props.color)
}))<{color:string,on:boolean}>`
    padding: 10px;
    display: flex;
    justify-content:space-between;
    border: 1px solid ${props=>props.color};
    box-shadow:${props => textShadow(props.color)};
    input[type="radio"]{
        display: none;
    }
    span{
        display: block;
        color: ${props=> props.color};
    }
`;

const IconStyle = css<{color:string}>`
    fill:${props=>props.color};
    stroke:${props=>props.color};
    filter: ${props=> `drop-shadow(${props.color})`};
`;

const SquareIcon = styled(BsBarChartFill)<{color:string}>`${IconStyle}`;

const CircleIcon = styled(BsBrightnessLow)<{color:string}>`${IconStyle}`;

const IconRadio:(props:{Icon:StyledComponent<IconType, any, {
    color: string;
}, never>,func:(e:React.ChangeEvent,arg:{prop:string})=>void,
checked:boolean,color:string,name:string})=>JSX.Element = ({Icon,checked,color,name,func}) =>{
    return(
        <IconRadioButton on={checked} color={color} >
            <input type="radio" checked={checked} onChange={(e)=>func(e,{prop:name})} />
            <Icon color={color}></Icon>
            <span>{name}</span>
        </IconRadioButton>
    )
}

const SpectrumButtons = () =>{
    const spectrum = useSelector((state:ReduceType)=>state.spectrumType);
    const dispatch = useDispatch();
    const handleClickBuuton = useCallback((e,arg)=>dispatch(setSpectrum(arg.prop,e.target.checked)),[spectrum]);
    return(
        <SpectrumContainer>
            <Head>spectrum type</Head>
            <RadioWrapper>
                <li>
                    <IconRadio checked={spectrum.square} Icon={SquareIcon} name="square" func={handleClickBuuton} color="#fff"></IconRadio>
                </li>
                <li>
                    <IconRadio checked={spectrum.circle} Icon={CircleIcon} name="circle" func={handleClickBuuton} color="#fff"></IconRadio>
                </li>
            </RadioWrapper>
        </SpectrumContainer>
    )
}

export default SpectrumButtons;