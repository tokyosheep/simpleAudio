import * as React from "react";
import { useMemo } from "react";
import { useSelector , useDispatch } from "react-redux";
import StateType from "../redux/StateType";

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
    const current = useSelector((state:StateType)=>state.currentMusic);
    const audio = useSelector((state:StateType)=>state.audioObject);
    useMemo(()=>{
        audio.setMusic(current?.path ?? "");
    },[current]);
    return(
        <>
            <GlobalStyle />
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