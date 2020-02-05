import React,  {Component, FunctionComponent, useRef, useState, useEffect, useMemo, Suspense}  from 'react'
import styled, {css} from 'styled-components'
import {Document, Page} from 'react-pdf'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

const StyledHobbies = styled.div`
    display: flex;
    flex-direction: column;
    align-self: center;
    top: 30%;
    position: absolute;
`

const Title = styled.div`
    display: flex;
    margin: 10px auto;
    font-size: 32px;
    font-family: sans-serif;
    font-weight: lighter;
    color: hotpink;
    width: 90%;
`

const Body = styled.div`
    width: 90%;
    flex-align: center;
    margin: 10px auto;
    font-size: 24px;
    font-family: sans-serif;
    font-weight: lighter;
    color: #222;
`

const OSU = styled.span`
    display: inline;
    color: #D73F09;
    font-size: 28px;
`

const Ind = styled.span`
    color: #00F;
    font-size: 28px;
`

const Footer = styled.div`
    display: flex;
    margin: 10px auto;
    font-size: 18px;
    font-family: sans-serif;
    font-weight: lighter;
    color: hotpink;
    width: 90%;
    justify-content: center;
    text-decoration: none !important;
    color: hotpink;
`



function Hobbies(){

    return (
        <StyledHobbies>
            <Title>
                About Me
            </Title>
            <Body>
                I am a computer science student at <OSU>Oregon State University</OSU>. I am from <Ind>India</Ind>. 
                Programming, Creating Websites, Playing with MS Paint, Playing Video Games and Watching Anime pretty much sums up my life.
                I love creating beautiful things with the things that I learn, hence I cannot create a website without including a three js 
                element or some css animation.           
            </Body>
            <Footer><Link to="/">Home</Link></Footer>
        </StyledHobbies>
      );
}

export default Hobbies