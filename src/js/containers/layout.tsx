import * as React from "react";
import { useMemo } from "react";
import { useSelector , useDispatch } from "react-redux";
import { window_set } from "../redux/actions/dispatchWIndow";
import StateType from "../redux/StateType";

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
        font-family: "Helvetica Neue" , Helvetica , Arial , Verdana , Roboto , "游ゴシック" , "Yu Gothic" , "游ゴシック体" , "YuGothic" , "ヒラギノ角ゴ Pro W3" , "Hiragino Kaku Gothic Pro" , "Meiryo UI" , "メイリオ" , Meiryo , "ＭＳ Ｐゴシック" , "MS PGothic" , sans-serif;;
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
    window.addEventListener("resize",()=>dispatch(window_set([window.innerWidth,window.innerHeight])));
    useMemo(()=>dispatch(window_set([window.innerWidth,window.innerHeight])),[]);
    return(
        <>
            <GlobalStyle />
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