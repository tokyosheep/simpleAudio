import styled from "styled-components";

export const windowWidth = 800;
export const valumeHeight = 125; 

export const containers = {
    Container:styled.div`
        display: grid;
        grid-template-rows: 300px 35px ${valumeHeight}px;
        grid-template-columns:minmax(400px , 1fr) 50px minmax(300px , 1fr);
        grid-template-areas:
        "label label musicList"
        "songDisplay songDisplay musicList"
        "control volume musicList"
        ;
        background: linear-gradient(rgb(0,0,0),rgb(20,20,20));
    `,
    LabelWrapper:styled.main<{img:string}>`
        grid-area:label;
        position: relative;
        background: #000;
        background: url(${props=>props.img});
        background-size: cover;
        background-position: center;
        background-attachment: fixed;
        overflow:hidden;
    `,
    SongDisplayWrapper:styled.aside`
        grid-area:songDisplay;
        position: relative;
        overflow:hidden;
        background: linear-gradient(rgba(0,0,0,0),rgba(50,50,50,0.1));
    `,
    ConrolWrapper:styled.section`
        grid-area:control;
        position: relative;
        background: 
            radial-gradient(rgba(0,0,0,0.2),rgba(60,60,60,0.2)),
            linear-gradient(rgb(0,0,0),rgb(20,20,20));
    `,
    VolumeWrapper:styled.aside`
        grid-area:volume;
        position: relative;
    `,
    MusicListWrapper:styled.nav<{isDrop:boolean}>`
        grid-area:musicList;
        position: relative;
        background: ${props=> props.isDrop ? "#444" : "#111"};
        overflow: scroll;
    `   
};

export const playListContainer = {
    Container:styled.div<{on:boolean}>`
        width: 100%;
        height: 100%;
        display:grid;
        grid-template-rows:100px minmax(300px,1fr) 30px;
        grid-template-columns:120px minmax(300px,1fr);
        grid-template-areas:
        "playHeader playHeader"
        "playList playMain"
        "playFooter playFooter"
        ;
        background: #222;
        transition: .3s linear;
        z-index: 20;
        position:absolute;
        top: 0;
        left: 0;
        opacity: ${props=> props.on ? 1 : 0};
        pointer-events: ${props=> props.on ? "auto" : "none"};
        transition: .6s linear;
    `,
    Header:styled.header`
        grid-area:playHeader;
        position: relative;
        display: block;
        padding: 5px;
    `,
    PlayList:styled.nav`
        grid-area:playList;
        position: relative;
    `,
    Main:styled.main`
        grid-area:playMain;
        overflow:scroll;
        display:flex;
        justify-content:flex-start;
        position: relative;
    `,
    Footer:styled.footer`
        grid-area:playFooter;
        position: relative;
    `
};