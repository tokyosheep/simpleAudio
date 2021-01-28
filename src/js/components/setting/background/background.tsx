import * as React from "react";
import {ipcRenderer} from "electron";
import { useCallback } from "react";
import styled from "styled-components";
import {useSelector,useDispatch} from "react-redux";
import StateType from "../../../redux/StateType";
import { picture_set , video_set , visualSetting_set } from "../../../redux/actions/dispatchVisual";
import BackgroundPath from "./bgPath";

const VisualPathWrapper = styled.div`
    padding: 15px;
    width: 95%;
`;

const BackgroundCompo = () =>{
    const dispatch = useDispatch();
    const picturePath = useSelector((state:StateType)=>state.background);
    const videoPath = useSelector((state:StateType)=>state.videoPath);
    const visualOption = useSelector((state:StateType)=>state.visualSetiing);
    const handlePicturePath = useCallback(()=>{
        (async()=>{
            const img = await ipcRenderer.invoke("getImagePath");
            if(img.canceled)return;
            dispatch(picture_set(img.filePaths[0]));
        })();
    },[picturePath]);
    const handleVideoPath = useCallback(()=>{
        (async()=>{
            const video = await ipcRenderer.invoke("getVideoPath");
            if(video.canceled)return;
            dispatch(video_set(video.filePaths[0]));
        })();
    },[videoPath]);
    return(
        <VisualPathWrapper>
            <BackgroundPath path={picturePath} checked={visualOption.picture} func={handlePicturePath} name="picture"/>
            <BackgroundPath path={videoPath} checked={visualOption.video} func={handleVideoPath} name="video"/>
        </VisualPathWrapper>
    )
}

export default BackgroundCompo;