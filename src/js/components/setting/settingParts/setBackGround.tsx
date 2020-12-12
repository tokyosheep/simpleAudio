import * as React from "react";
import {useCallback} from "react";
import styled,{css,StyledComponent} from "styled-components";
import {setBackGround} from "../../../redux/actions/mapDispatchToProps";
import {useSelector,useDispatch} from "react-redux";
import { ReduceType } from "../../../redux/reducer";
import {getBackgroundImage} from "../../../fileSystem/handleMusicFies";

import {Head} from "./commonTitle";

const BackgroundSetContainer = styled.div`
    padding: 10px;
`;

const TextButton = styled.button`
    background: rgba(0,0,0,0.3);
    border: 1px solid #fff;
    color: #fff;
    font-weight: 200;
    border-radius: 5px;
    &:focus{
        outline:none;
    }
`;

const ImageName = styled.div`
    display: block;
    bottom: 1px solid #fff;
    color: #ffffff;
    font-weight: 200;
    width: 240px;
    overflow: hidden;
    margin-left: 10px;
    white-space: nowrap;
`;

const ImageWrapper = styled.div`
    display: flex;
    justify-content:flex-start;
`;

const BackGroundForm = () =>{
    const dispatch = useDispatch();
    const backgroundPath = useSelector((state:ReduceType)=>state.backGroundPath);
    const handleBackGround = useCallback(()=>{
        console.log("click");
        (async()=>{
            const image = await getBackgroundImage();
            console.log(image);
            if(!image)return;
            dispatch(setBackGround(image));
        })();
    },[backgroundPath]);
    return(
        <BackgroundSetContainer>
            <Head>image</Head>
            <ImageWrapper>
                <TextButton onClick={handleBackGround}>set image</TextButton>
                <ImageName>{backgroundPath}</ImageName>
            </ImageWrapper>
        </BackgroundSetContainer>
    )
}

export default BackGroundForm;