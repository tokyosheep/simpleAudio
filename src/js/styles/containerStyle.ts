import styled from "styled-components";
export const volumeHeight = 125;

export const styleComponent = {
    container:styled.div`
        display: grid;
        grid-template-rows:minmax(200px,1fr) 25px ${volumeHeight}px;
        grid-template-columns:minmax(350px,1fr) 50px minmax(300px,1fr);
        grid-template-areas:
        "label label musicList"
        "songDisplay songDisplay musicList"
        "control volume musicList";
        background: linear-gradient(rgb(0,0,0),rgb(20,20,20));
    `,
    labelData:styled.section`   
        display:grid;
        grid-area:label;
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
}