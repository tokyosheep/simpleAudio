import * as React from "react";
import styled, { css } from 'styled-components';

import VolumeCompo from "../components/volume/volumeCompo";
import ControlCompo from "../components/control/controlCompo";
import SongDisplayCompo from "../components/songDisplay/songDisplayCompo";
import LabelCompo from "../components/label/labelCompo";
import MusicList from "../components/musicList/musicList";
import FooterCompo from "../components/footer/footer";

import {styleComponent} from "../styles/containerStyle";
const Container = styleComponent.container;

const AudioContainer = () =>{
    return(
        <Container>
            <LabelCompo />
            <SongDisplayCompo />
            <ControlCompo />
            <VolumeCompo />
            <MusicList />
            <FooterCompo />
        </Container>
    )
}

export default AudioContainer;