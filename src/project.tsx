import React,  {Component, FunctionComponent, useRef, useState, useEffect, useMemo, Suspense, useCallback}  from 'react'
import styled, {css} from 'styled-components'
import ReactDom from 'react-dom'
import {ProjectType} from "./commons"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

const StyledProject = styled.div`
    display: flex;
    font-family: sans-serif;
    flex-direction: column;
    padding: 5px;
    margin: 5px;
    width: 50%;
    margin: 10px auto;

    & div, img, a {
        margin: 10px 0;
    }
`

const Title = styled.div`
    display:flex;
    color: hotpink;
    font-size: 28px;
`

const Image = styled.img`
    display:flex;
    color: 222;
    width: 300px;
    min-height: 200px;

    &.loading {
        background: #dadada;
        border: 2px dashed #5a5a5a;
    }
`

const Description = styled.div`
    display:flex;
    color: 222;
`

const MyLink = styled.a`
    display:flex;
    color: 222;
    text-decoration: none !important;
`

const Footer = styled.div`
    display: flex;
    position: fixed;
    width: 50px;
    top: 10%;
    left: 10%;
    font-size: 18px;
    font-family: sans-serif;
    font-weight: lighter;
    color: hotpink;
    justify-content: center;
    text-decoration: none !important;
    color: hotpink;
`



function Project(props: ProjectType){
    const [imageLoaded, setImageLoaded] = useState(false)
    return <StyledProject>
        <Title>{props.title}</Title>
        <Image className={imageLoaded ? "": "loading"} src={props.image} onLoad={()=>setImageLoaded(true)}/>
        <Description>{props.description}</Description>
        <MyLink href={props.link}>Read More</MyLink>
        <Footer><Link to="/">Home</Link></Footer>
    </StyledProject>
}

export default Project