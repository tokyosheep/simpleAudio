import styled from "styled-components";

export const containers = {
    Container:styled.div`
        display: grid;
        grid-template-rows: minmax(300px , 1fr) 25px 100px;
        grid-template-columns:minmax(400px , 1fr) 50px minmax(300px , 2fr);
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
    `,
    SongDisplayWrapper:styled.aside`
        grid-area:songDisplay;
        position: relative;
        overflow:hidden;
    `,
    ConrolWrapper:styled.section`
        grid-area:control;
        position: relative;
        background: #345;
    `,
    VolumeWrapper:styled.aside`
        grid-area:volume;
        position: relative;
    `,
    MusicListWrapper:styled.nav<{isDrop:boolean}>`
        grid-area:musicList;
        position: relative;
        background: ${props=> props.isDrop ? "#444" : "#111"};
    `
};