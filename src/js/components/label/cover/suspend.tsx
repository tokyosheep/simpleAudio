import * as React from "react";
import styled,{keyframes} from "styled-components";
import { centerPlaced } from "../../../styles/mixin";

const flashing = keyframes`
    0%{
        opacity: .4;
    }

    50%{
        opacity: .8;
    }

    100{
        opacity: .4;
    }
`;

const SuspendWrapper = styled.div`
    background: rgba(40,40,40,0.8);
    animation: ${flashing} .8s linear infinite;
`;

const TextSuspend = styled.div`
    color: #fff;
    font-size: 300px;
    font-size: 15px;
    ${centerPlaced};
`;

export const SuspoendLoading = () =>(
    <SuspendWrapper>
        <TextSuspend>loading...</TextSuspend>
    </SuspendWrapper>
)

export const wrapPromise:(promise:Promise<string>)=>{read:()=>string} = promise =>{
    let status = "pending";
    let result:string;

    const suspender = promise.then(
        (r)=>{
            status = "fuilfilled";
            result = r;
        },
        (e)=>{
            status = "rejected";
            result = e;
        }
    )

    const read = () =>{
        if(status === "pending"){
            throw suspender;
        }else if(status === "rejected"){
            throw result;
        }else{
            return result;
        }
    };
    return { read };
}