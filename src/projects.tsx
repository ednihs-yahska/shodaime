import React,  {Component, FunctionComponent, useRef, useState, useEffect, useMemo, Suspense}  from 'react'
import styled, {css} from 'styled-components'
import ReactDom from 'react-dom'
import Project from './project'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import {ProjectType} from "./commons"

const StyledProjects = styled.ul`
    display: flex;

    & li{
        list-style-type: none;
    }
`
import {StyledAnchor} from './commons'



const projects = [
    {
        title: "GL Camera Effects",
        image: "https://github.com/ednihs-yahska/GLCameraEffects/blob/lm/readme/Demo.png?raw=true",
        description: "This is an OpenGl camera system. The goal was to create an OpenGL camera with motion blur, lensflare and depth of field effect. One unique property about motion blur effect is that it is a post-processing effect and does not use previous frame via internal buffers, but the previous frame itself",
        link: "https://github.com/ednihs-yahska/GLCameraEffects"
    },
    {
        title: "WebGL LensFlare Effects",
        image: "https://github.com/ednihs-yahska/n_minus_1/raw/master/screenshot.png",
        description: "This is an WebGl camera system. The goal was to create lensflare system for a WebGl component",
        link: "https://github.com/ednihs-yahska/GLCameraEffects"
    },
    {
        title: "HazAdapt EMCi*",
        image: "/assets/images/emci_screenshot.png",
        description: "Emergency Management Communication interface at HazAdapt is a project that helps emergency managers on campus to react to hazards sooner than traditional methods that can help save lives",
        link: "www.hazadapt.com"
    },
    {
        title: "Mick's crossing",
        image: "https://github.com/oregonstatevr/micks_crossing/raw/master/screenshot.png",
        description: "Mick's crossing is a video game that was part of a seminar by me at Oregon State University teaching 3D Modeling in blender and Unity game engine.",
        link: "https://github.com/oregonstatevr/micks_crossing"
    }
]

export default function Projects() {
    return <StyledProjects>
           {
            projects.map((project: ProjectType, key)=>{
                <Project key={key} title={project.title} image={project.image} description={project.description} link={project.link}/>
            })
           }
        </StyledProjects>
}