import React,  {Component, FunctionComponent, useRef, useState, useEffect, useMemo, Suspense}  from 'react'
import styled, {css} from 'styled-components'
import {Canvas, useFrame, useLoader, useUpdate} from 'react-three-fiber'

const StyledLoader = styled.div`
    display: flex;
`

function BaseSuspense() {
    return <StyledLoader>
        Base Suspense
    </StyledLoader>
}

export default BaseSuspense