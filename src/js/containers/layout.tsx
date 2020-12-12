import * as React from "react";
import AudioContainer from "./audioMain";

import { createGlobalStyle } from "styled-components";
import Setting from "../components/setting/setting";

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
    return(
        <>
            <GlobalStyle  />
            <Setting />
            <AudioContainer />
        </>
    )
}

export default Layout;