import styled from "styled-components";
export const volumeHeight = 125;

export const styleComponent = {
    container:styled.div`
        display: grid;
        grid-template-rows:minmax(200px,1fr) 25px ${volumeHeight}px minmax(30px,1fr);
        grid-template-columns:minmax(350px,1fr) 50px minmax(300px,1fr);
        grid-template-areas:
        "label label musicList"
        "songDisplay songDisplay musicList"
        "control volume musicList"
        "footer footer footer"
        ;
        background: linear-gradient(rgb(0,0,0),rgb(20,20,20));
    `,
    labelData:styled.section<{img:string}>`   
        display:grid;
        grid-area:label;
        background: url(${props=>props.img});
        background-size: cover;
        background-position: center;
        background-attachment: fixed;
        position: relative;
    `,
    songDisplay:styled.div`
        display:grid;
        grid-area:songDisplay;
        position: relative;
        overflow:hidden;
    `,
    control:styled.main`
        display:grid;
        grid-area:control;
    `,
    volume:styled.aside`
        display:grid;
        grid-area:volume;
        position: relative;
    `,
    musicList:styled.aside`
        display:grid;
        grid-area:musicList;
        position: relative;
    `,
    footer:styled.footer`
        display:grid;
        grid-area:footer;
        background: linear-gradient(rgb(20,20,20),rgb(0,0,0));
    `
}