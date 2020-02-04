import React,  {Component, FunctionComponent, useRef, useState, useEffect, useMemo, Suspense}  from 'react'
import styled, {css} from 'styled-components'
import ReactDom from 'react-dom'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

const StyledProjects = styled.ul`
    display: flex;

    & li{
        list-style-type: none;
    }
`
import {StyledLink} from './commons'

export default function Projects() {
    return <StyledProjects>
            <li>
                <StyledLink to="https://github.com/ednihs-yahska/GLCameraEffects">OpenGL Camera System</StyledLink>
            </li>
            <li>
                <StyledLink to="">HazAdapt EMCi</StyledLink>
            </li>
            <li>
                <StyledLink to="">LensFlare threejs</StyledLink>
            </li>
        </StyledProjects>
}