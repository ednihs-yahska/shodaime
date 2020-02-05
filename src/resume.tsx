import React,  {Component, FunctionComponent, useRef, useState, useEffect, useMemo, Suspense}  from 'react'
import styled, {css} from 'styled-components'
import {Document, Page} from 'react-pdf'

const StyledResume = styled.div`
    display: flex;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color:#222;
    font-size: 34px;
    font-family: sans-serif;
    text-align: center;
`

function Resume(){

    return (
        <StyledResume onClick={()=>{
            window.open("/pdf/Resume_Akshay_Shinde_Web.pdf", "_blank")
        }}>
            Download Resume
        </StyledResume>
      );
}

export default Resume