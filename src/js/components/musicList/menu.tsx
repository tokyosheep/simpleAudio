import React from "react";
import styled from "styled-components";
import { useCallback , useState } from "react";
import { CurrentMusicType } from "../../redux/reducer/musics";
import {useSelector,useDispatch} from "react-redux";
import StateType from "../../redux/StateType";
import { windowMode_set } from "../../redux/actions/dispatchWIndow";
import { album_add } from "../../redux/actions/dispatchMusics";
import { getAlbumAndMusics } from "../../fileSystem/handleMusicFiles";
import { rgba } from "polished";
import { centerPlaced } from "../../styles/mixin";

const MenuWrapper = styled.div`
    width: 100%;
    height: 25px;
    display: flex;
    justify-content:space-around;
    background: #000;
`;

const MenuButton = styled.div<{color:string}>`
    width: 32%;
    height: 90%;
    margin: auto;
    background: linear-gradient(rgb(0,0,0),rgb(30,30,30));
    position: relative;
    cursor: pointer;
    div{
        text-shadow:0px 0px 5px ${props=>rgba(props.color,0.8)};
        color:${props=>props.color};
        font-size: 12px;
        ${centerPlaced}
        font-weight: 200;
    }
`;

const MusicMenu = () =>{
    const dispatch = useDispatch(); 
    const uiColor = useSelector((state:StateType)=>state.uiColor);
    const albums = useSelector((state:StateType)=>state.albumList);
    const modeWindow = useSelector((state:StateType)=>state.modeWindow);
    const handleSetWindow = useCallback(()=>dispatch(windowMode_set(true,"setting")),[modeWindow]);
    console.log(albums);
    const handleMusicsButton = useCallback(()=>{
        (async()=>{
            const album = await getAlbumAndMusics();
            if(!album)return;
            dispatch(album_add([album]));
        })();
    },[albums]);
    const handlePlayListSet = useCallback(()=>dispatch(windowMode_set(true,"setPlayList")),[modeWindow]);
    const handlePlayMenu = useCallback(()=>dispatch(windowMode_set(!modeWindow.playlist,"playlist")),[modeWindow]);
    return(
        <MenuWrapper>
            <MenuButton color={uiColor} onClick={handleMusicsButton}>
                <div>album</div>
            </MenuButton>
            <MenuButton color={uiColor} onClick={handleSetWindow}>
                <div>setting</div>
            </MenuButton>
            <MenuButton color={uiColor} onClick={handlePlayMenu} >
                <div>{modeWindow.playlist ? "play list" : "musics"}</div>
            </MenuButton>
            <MenuButton color={uiColor} onClick={handlePlayListSet}>
                <div>set list</div>
            </MenuButton>
        </MenuWrapper>
    )
}

export default MusicMenu;