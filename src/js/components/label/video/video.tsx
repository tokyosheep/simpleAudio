import * as React from "react";
import { useEffect , useRef , useState , useMemo } from "react";
import videojs from "video.js";
import { VideoJsPlayerOptions , VideoJsPlayer } from "video.js";
import styled from "styled-components";
import {useSelector,useDispatch} from "react-redux";
import StateType from "../../../redux/StateType";
import { centerPlaced } from "../../../styles/mixin";

const VideoWrapper = styled.div<{visible:boolean}>`
    height: 100%;
    width: 100%;
    z-index: 2;
    position: absolute;
    display: ${props=> props.visible ? "block" : "none"};
    .vjs_video_3-dimensions{
        width: 100%;
        height: 100%;
    }
    video{
        width: 120%;
        height: auto;
        top: 50%;
        left: 50%;
        display: block;
    }
    
`;

const VideoPlayer = ({visible}:{visible:boolean}) =>{
    const videoPath = useSelector((state:StateType)=>state.videoPath);
    const [player,setPlayer] = useState<VideoJsPlayer|null>(null);
    console.log(videoPath);
    const playerRef = useRef(null);
    const videoJsOptions:VideoJsPlayerOptions = {
        autoplay: true,
        controls: false,
        muted:true,
        loop:true,
        sources: [{
            src: videoPath,
            type: 'video/mp4'
        }],
        /*
        children:[
            
        ]
        */
    }
    useEffect(()=>{
        setPlayer(videojs(playerRef.current,videoJsOptions,()=>{
            console.log("ready",player);
        }))
        return () => {
            player?.dispose();
        };
    },[videoPath]);
    useMemo(()=>{
        if(player !== null)player.src(videoPath)}
    ,[videoPath]);
    return(
        <VideoWrapper visible={visible}>
            <video ref={playerRef} ></video>
        </VideoWrapper>
    )
}

export default VideoPlayer;