import * as React from "react";
import { useMemo } from "react";
import { useSelector , useDispatch } from "react-redux";
import { window_set } from "../redux/actions/dispatchWIndow";
import { album_add } from "../redux/actions/dispatchMusics";
import { playList_set } from "../redux/actions/dispatchPlayList";
import StateType from "../redux/StateType";
import { RecordType } from "../../../main/DataBase";
import electron, { ipcRenderer } from "electron";
import useRecord from "./commutDataBase";

import OverLayer from "../overCompo/overLayer";
import PlaylistContents from "../components/setPlayList/playListContainer";
import SettingWrapper from "../components/setting/settingCompo";
import MusicListContainer from "../components/musicList/musicListContainer";
import Label from "../components/label/Label";
import SongDisplay from "../components/songDisplay/songDisplay";
import ControlorCompo from "../components/controlor/controlor";
import ValuemeCompo from "../components/volume/valume";
import { createGlobalStyle } from "styled-components";

import { containers } from "../styles/containers";
const { Container } = containers;

const GlobalStyle = createGlobalStyle`
    body{
        margin: 0;
        font-family: "Helvetica Neue" , Helvetica , Arial , Verdana , Roboto , "游ゴシック" , "Yu Gothic" , "游ゴシック体" , "YuGothic" , "ヒラギノ角ゴ Pro W3" , "Hiragino Kaku Gothic Pro" , "Meiryo UI" , "メイリオ" , Meiryo , "ＭＳ Ｐゴシック" , "MS PGothic" , sans-serif;
        background: rgb(20,20,20);
    }
    @font-face {
        font-family: 'DSEG7-Classic';
        src: url('./node_modules/dseg/fonts/DSEG7-Classic/DSEG7Classic-Regular.woff2') format('woff2'),
        url('./node_modules/dseg/fonts/DSEG7-Classic/DSEG7Classic-Regular.woff') format('woff'),
        url('./node_modules/dseg/fonts/DSEG7-Classic/DSEG7Classic-Regular.ttf') format('truetype');
        font-weight: normal;
        font-style: normal;
    }
    @font-face {
        font-family: "Scoreboard";
        src: url("./digitalFont/CrashedScoreboard.ttf") format("truetype");
        font-weight: normal;
        font-style: normal;
    }
`;

const Layout = () =>{
    const dispatch = useDispatch();
    useRecord();
    useMemo(()=>{
        window.addEventListener("resize",()=>dispatch(window_set([window.innerWidth,window.innerHeight])));
        dispatch(window_set([window.innerWidth,window.innerHeight]));
        (async()=>{
            try{
                const data:RecordType[] = await ipcRenderer.invoke("loadAllData");
                console.log(data);
                dispatch(album_add(data[0].albums));
                dispatch(playList_set(data[0].playList));
                console.log(data);
            }catch(e){
                console.log(e)
            }
        })();
    },[]);
    return(
        <>
            <GlobalStyle />
            <OverLayer />
            <PlaylistContents />
            <SettingWrapper />
            <Container>
                <Label />
                <SongDisplay />
                <ControlorCompo />
                <ValuemeCompo />
                <MusicListContainer />
            </Container>
        </>
    )
}

export default Layout;