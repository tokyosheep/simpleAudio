import * as React from "react";
import {useSelector,useDispatch} from "react-redux";
import StateType from "../../redux/StateType";
import { playListContainer } from "../../styles/containers";
import PlayListHeader from "./header/playListHeader";
import PlayListCompo from "./playlist/playList";
import PlayListMainCompo from "./mainMusicList/playListMain";
import PlayListFooter from "./footer/playListFooter";

const { Container } = playListContainer;

const PlaylistContents = () =>{
    const setMode = useSelector((state:StateType)=>state.modeWindow);
    return(
        <Container on={setMode.setPlayList}>
            <PlayListHeader />
            <PlayListCompo />
            <PlayListMainCompo />
            <PlayListFooter />
        </Container>
    )
}

export default PlaylistContents;