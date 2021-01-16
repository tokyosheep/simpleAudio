import React from "react";
import styled from "styled-components";
import { useCallback } from "react";
import {useSelector,useDispatch} from "react-redux";
import StateType from "../../redux/StateType";
import { album_add } from "../../redux/actions/dispatchMusics";
import {FiRepeat,FiFolder,FiArrowRight,FiShuffle} from "react-icons/fi";
import { getAlbumAndMusics } from "../../fileSystem/handleMusicFiles";

const MenuWrapper = styled.div`
    width: 100%;
    height: 50px;
    display: flex;
    justify-content:flex-start;
`;

const Foldericon = styled(FiFolder)`
    width: 30px;
    height: 30px;
`;

const MusicMenu = () =>{
    const dispatch = useDispatch(); 
    const albums = useSelector((state:StateType)=>state.albumList);
    console.log(albums);
    const handleMusicsButton = useCallback(()=>{
        (async()=>{
            const album = await getAlbumAndMusics();
            if(!album)return;
            dispatch(album_add([album]));
        })();
    },[albums]);
    return(
        <MenuWrapper>
            <Foldericon onClick={handleMusicsButton}></Foldericon>
        </MenuWrapper>
    )
}

export default MusicMenu;