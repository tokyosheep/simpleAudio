import styled,{css} from "styled-components";
import {rgba} from "polished";

export const mainBlue = "#559ae0"; 
export const shine = `0px 0px 3px 3px ${rgba(mainBlue,0.4)}`;

export const shineStyle = css`
    box-shadow:${shine};
    border: 1px solid ${mainBlue};
`;

export const shineSVG = css`
    filter: drop-shadow(${shine});
    stroke:${mainBlue};
`;