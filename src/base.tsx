import React,  {Component, FunctionComponent, useRef, useState, useEffect, useMemo, Suspense}  from 'react'
import styled from 'styled-components'
import ReactDom from 'react-dom'
import {Canvas, useFrame, useLoader, useUpdate} from 'react-three-fiber'
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
//import {OrbitControls} from "three/examples/js/controls/OrbitControls.js"
import * as THREE from 'three'

//apply({OrbitControls})

type MeshType = {
    current?: any
}
function Box(props: any) {
    // This reference will give us direct access to the mesh
    const mesh:MeshType = useRef()
    
    // Set up state for the hovered and active state
    const [hovered, setHover] = useState(false)
    const [active, setActive] = useState(false)
    
    // Rotate mesh every frame, this is outside of React without overhead
    useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01))
    
    return (
      <mesh
        {...props}
        ref={mesh}
        scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
        onClick={e => setActive(!active)}
        onPointerOver={e => setHover(true)}
        onPointerOut={e => setHover(false)}>
        <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
        <meshStandardMaterial attach="material" color={hovered ? 'hotpink' : 'orange'} />
      </mesh>
    )
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


const Root: FunctionComponent<{}> = ()=> 
        <Canvas 
        onScroll={e=>console.log((e.target as HTMLCanvasElement).scrollTop)}
        onClick={e=>console.log((e:EventTarget) => console.log("Clicked in Canvas"))}>
            <Suspense fallback={null}>
                <ambientLight />
                <pointLight position={[20, 10, 10]} />
                <Box position={[-1.2, 0, 0]} />
                <Box position={[1.2, 0, 0]} />
                <Text hAlign="left" position={[0, 0, 0]} children="Akshay" />
            </Suspense>
        </Canvas>


ReactDom.render(React.createElement(Root), document.getElementById("app"))

// var scene = new THREE.Scene();
// var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

// var renderer = new THREE.WebGLRenderer();
// renderer.setSize( window.innerWidth, window.innerHeight );
// document.body.appendChild( renderer.domElement );

// var geometry = new THREE.BoxGeometry();
// var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
// var cube = new THREE.Mesh( geometry, material );
// scene.add( cube );

// camera.position.z = 5;

// var animate = function () {
//     requestAnimationFrame( animate );

//     cube.rotation.x += 0.01;
//     cube.rotation.y += 0.01;

//     renderer.render( scene, camera );
// };

// animate();

