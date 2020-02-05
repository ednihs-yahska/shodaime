import React,  {Component, FunctionComponent, useRef, useState, useEffect, useMemo, Suspense}  from 'react'
import styled, {css, keyframes} from 'styled-components'
import ReactDom from 'react-dom'

const bounce = keyframes`
        0%   { transform: scale(1,1)      translateY(0); }
        10%  { transform: scale(1.1,.9)   translateY(0); }
        30%  { transform: scale(.9,1.1)   translateY(-100px); }
        50%  { transform: scale(1.05,.95) translateY(0); }
        57%  { transform: scale(1,1)      translateY(-7px); }
        64%  { transform: scale(1,1)      translateY(0); }
        100% { transform: scale(1,1)      translateY(0); }
`

const StyledBadge  = styled.div`
    display: flex;
    position: absolute;
    height: 150px;
    width: 150px;
    border-radius: 80px;
    border: 5px solid #dadada;
    background-image: url("/images/me.png");
    background-position: center center;
    background-size: contain;
    top: 50%;
    right: calc(50% + -75px);

    &.bounce{
        animation: 2s ${bounce} infinite;
        animation-timing-function: cubic-bezier(0.280, 0.840, 0.420, 1);
    }

    &.top-right{
        top: 10%;
        right: 10%;
        transform: scale(0.75, 0.75);
        transition: top 1s, right 1s, transform 1s;
    }
`

function Badge(){
    let [isTR, setTR] = useState(true)

    useEffect(()=>{
        setTimeout(()=>setTR(false), 5000)
    },[])
    return(<StyledBadge className={isTR ? "center bounce" : "top-right"}>
        </StyledBadge>)

}

export default Badge