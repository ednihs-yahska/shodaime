import React,  {Component, FunctionComponent, useRef, useState, useEffect, useMemo, Suspense, useCallback}  from 'react'
import styled, {css} from 'styled-components'
import ReactDom from 'react-dom'
import {Canvas, useFrame, useLoader, useUpdate} from 'react-three-fiber'
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import * as THREE from 'three'
import {device} from './device'
import Projects from './projects'
import Resume from './resume'
import Badge from './badge'
import Hobbies from './hobbies'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {StyledLink} from './commons'



const StyledMenu = styled.div`
  display: flex;
  flex-direction: column;
  font-family: sans-serif;
  font-size: 42px;
  position: absolute;
  padding: 5px;
  top: 50%;
  right: 0;
  padding-right: 20%;
  transform: translateY(-50%);
  @media (max-width: 768px) {
    left:50%;
    transform: translateX(-50%);
  }
`

const StyledScreen = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  background: #222;
  top: 0;

  &.alive{
    display: block;
  }

  &.dead{
    display: none;
  }
`

const Footnote = styled.div`
  position: absolute;
  bottom: 5px;
  right: 5px;
  font-family: 32px;
  font-family: sans-serif;
`

function Screen(){
  let [visible, setVisible] = useState(true)
  useEffect(()=>{
    setTimeout(()=>setVisible(false), 5000)
  },[])
  return <StyledScreen className={visible ? "alive" : "dead"}/>
}

function Text({ children, vAlign = 'center', hAlign = 'center', size = 1, color = '#000000', ...props }: any) {
    const font = useLoader(THREE.FontLoader, '/fonts/Shadows_Into_Light_Regular.json')
    const config = useMemo(
      () => ({ font, size: 10, height: 10, curveSegments: 32, bevelEnabled: true, bevelThickness: 6, bevelSize: 2.5, bevelOffset: 0, bevelSegments: 8 }),
      [font]
    )
    const mesh = useUpdate(
      (self:THREE.Mesh) => {
        const size = new THREE.Vector3()
        self.geometry.computeBoundingBox()
        self.geometry.boundingBox.getSize(size)
        self.position.x = hAlign === 'center' ? -size.x / 2 : hAlign === 'right' ? 0 : -size.x
        self.position.y = vAlign === 'center' ? -size.y / 2 : vAlign === 'top' ? 0 : -size.y
      },
      [children]
    )
    return (
      <group {...props} scale={[0.1 * size, 0.1 * size, 0.1]}>
        <mesh ref={mesh}>
          <textGeometry attach="geometry" args={[children, config]} />
          <meshNormalMaterial attach="material" />
        </mesh>
      </group>
    )
  }

function Title() {
  const ref:any = useRef()
  useFrame(({ clock }) => (ref.current.rotation.x = ref.current.rotation.y = ref.current.rotation.z = Math.sin(clock.getElapsedTime()) * 0.3))
  return (
    <group ref={ref}>
      <Text hAlign="left" position={[0, 2, 0]} children="Akshay" />
      <Text hAlign="left" position={[0, 0, 0]} children="Shinde" />
    </group>
  )
}

function Menu():JSX.Element {
  return <StyledMenu>
    <StyledLink to="/projects"><span>Projects</span></StyledLink>
    <StyledLink to="" onClick={()=>{
            window.open("/pdf/Resume_Akshay_Shinde_Web.pdf", "_blank")
        }}> Resume </StyledLink>
    <StyledLink to="/hobbies"><span>About Me</span></StyledLink>
  </StyledMenu>
}

const Root: FunctionComponent<{}> = () => {
  return <Router>
    <Switch>
      <Route path="/projects"><Projects /></Route>
      <Route path="/resume"><Resume /></Route>
      <Route path="/hobbies"><Hobbies /></Route>
      <Route exact path="/">
        <div id="root-child">
          <Canvas 
          onScroll={e=>console.log((e.target as HTMLCanvasElement).scrollTop)}
          onClick={e=>console.log((e:EventTarget) => console.log("Clicked in Canvas"))}>
              <Suspense fallback={
                null
              }>
                  <ambientLight />
                  <pointLight position={[20, 10, 10]} />
                  <Title />
              </Suspense>
          </Canvas>
          <Menu />
          <Footnote>This website is under a little maintenance ☺️ I got a bit too excited about react three fiber.</Footnote>
        </div>
        <Screen />
        <Badge />
      </Route>
      <Route path="*">
            Path Not Found
      </Route>
    </Switch>
  </Router>
}


ReactDom.render(React.createElement(Root), document.getElementById("app"))


