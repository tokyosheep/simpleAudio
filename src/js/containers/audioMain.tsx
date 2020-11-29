import * as React from "react";
import styled, { css,ThemeContext } from 'styled-components'

const AudioMain = () =>{
    return(
        <Container>
            <Button name="function" onClick={(e)=>console.log(e.target)}>Normal Button</Button>
        </Container>
    )
}

const Button = styled.button`
    background: transparent;
    border-radius: 3px;
    border: 2px solid palevioletred;
    color: palevioletred;
    margin: 0 1em;
    padding: 0.25em 1em;
`;


const Container = styled.div`
    text-align: center;
`;

export default AudioMain;