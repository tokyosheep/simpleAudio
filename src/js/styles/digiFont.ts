import styled from "styled-components";

export const DigiFont = styled.span<{size:number}>`
    color: rgb(255,200,200);
    font-size:${props=> props.size}px;
    text-align:center;
`;