import * as React from "react";
import {useCallback} from "react";
import styled from "styled-components";
import {useSelector,useDispatch} from "react-redux";
import {setMusicSets,setCurrentMusic,setOptions} from "../../redux/actions/mapDispatchToProps";
import {ReduceType} from "../../redux/reducer/index";

import {FiRepeat,FiFolder,FiArrowRight,FiShuffle} from "react-icons/fi";
import {shineSVG,optionsButton} from "../../styles/commonColor"; 
import {getMusics,getMusicData} from "../../fileSystem/handleMusicFies";
import {MusicObject} from "../../redux/reducer/type";

const Repeat = styled(FiRepeat)<{on:string}>`
    ${optionsButton}
`;

const FolderIcon = styled(FiFolder)`
    ${shineSVG}
`;

const SuccessionIcon = styled(FiArrowRight)<{on:string}>`
    ${optionsButton}
`;

const ShuffleIcon = styled(FiShuffle)<{on:string}>`
    ${optionsButton}
`;

const Wrapper = styled.div`
    width: 100%;
    height: 20px;
    display: flex;
    justify-content:flex-start;
`;

const IconWrapper = () =>{
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
        const musicData:MusicObject[] = musicObj.filter(m=> m.status === "fulfilled").map((r:any) => r.value);
        console.log(musicData);
        dispatch(setMusicSets(musicData));
    }
    const options = useSelector((state:ReduceType)=>state.playOptions);
    const handleClickIcon = useCallback((e,arg:{prop:string,on:boolean})=>{
        dispatch(setOptions(arg.prop,!arg.on));
    },[options])
    return(
        <Wrapper>
            <FolderIcon onClick={clickFolder}></FolderIcon>
            <Repeat on={String(options.repeat)} onClick={(e)=>handleClickIcon(e,{prop:"repeat",on:options.repeat})}></Repeat>
            <SuccessionIcon on={String(options.succession)} onClick={(e)=>handleClickIcon(e,{prop:"succession",on:options.succession})}></SuccessionIcon>
            <ShuffleIcon on={String(options.shuffle)} onClick={(e)=>handleClickIcon(e,{prop:"shuffle",on:options.shuffle})}></ShuffleIcon>
        </Wrapper>
    )
}

export default IconWrapper;