import * as React from "react";
import {useMemo} from "react";
import {useSelector,useDispatch} from "react-redux";
import {setMusicSets,setCurrentMusic} from "../../redux/actions/mapDispatchToProps";
import {ReduceType} from "../../redux/reducer/index";
import styled from "styled-components";

import {PlatyButton,StopButton} from "./buttons"; 
import {MusicLength} from "./progressBar";
import {FiRepeat,FiFolder} from "react-icons/fi";
import {mainBlue,shineStyle,shineSVG} from "../../styles/commonColor"; 
import {styleComponent} from "../../styles/containerStyle";

import {getMusics,getMusicData} from "../../fileSystem/handleMusicFies";

import {MusicObject} from "../../redux/reducer/type";

import useAudio from "./audiohooks";

const Control = styleComponent.control;

const Repeat = styled(FiRepeat)`
    ${shineSVG}
`;

const FolderIcon = styled(FiFolder)`
    ${shineSVG}
`;

const ButtonWrapper = styled.div`
    display: flex;
    justify-content:space-around;
`;

const IconWrapper = styled.div`
    width: 100%;
    height: 20px;
    display: flex;
    justify-content:flex-start;
`;

const ControlCompo = () =>{
    const currentMusic = useSelector((state:ReduceType)=>state.currentMusic);
    const [playMusic, currentTime,play,pause,jump,setMusic] = useAudio();
    useMemo(()=>setMusic(currentMusic?.path ?? "" ),[currentMusic]);
    const dispatch = useDispatch();
    const clickFolder = async() =>{
        const musics = await getMusics();
        console.log(musics);
        if(!musics)return;
        const musicObj = await Promise.allSettled(musics.map(async(music,index)=>{
            try{
                const musicObj = await getMusicData(music,index);
                return musicObj;
            }catch(e){
                alert(e);
                return null;
            }
        }));
        console.log(musicObj);
        const musicData:MusicObject[] = musicObj.filter(m=> m.status === "fulfilled").map((r:any) => r.value);
        console.log(musicData);
        dispatch(setMusicSets(musicData));
    }

    return(
        <Control>
            <IconWrapper>
                <Repeat></Repeat>
                <FolderIcon onClick={clickFolder}></FolderIcon>
            </IconWrapper>
            <MusicLength></MusicLength>
            <ButtonWrapper>
                <PlatyButton></PlatyButton>
                <StopButton></StopButton>
            </ButtonWrapper>
        </Control>
    )
}

export default ControlCompo;