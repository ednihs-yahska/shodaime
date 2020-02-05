import React,  {Component, FunctionComponent, useRef, useState, useEffect, useMemo, Suspense, useCallback}  from 'react'
import styled, {css} from 'styled-components'
import ReactDom from 'react-dom'
import {ProjectType} from "./commons"

const StyledProject = styled.div`
    display: flex;

`

const Title = styled.div`
    display:flex;
`

const Image = styled.div`
    display:flex;
`

const Description = styled.div`
    display:flex;
`

const Link = styled.div`
    display:flex;
`
function Project(props: ProjectType){
    return 
    <StyledProject>
        <Title>{props.title}</Title>
        <Image>{props.image}</Image>
        <Description>{props.description}</Description>
        <Link>{props.link}</Link>
    </StyledProject>
}

export default Project