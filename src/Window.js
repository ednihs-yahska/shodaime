import React, { Component } from 'react';
import vsSource from './vertex_shader';
import fsSource from './fragment_shader';
import {mat4} from 'gl-matrix';
import logo from './logo.svg';
import * as THREE from 'three';


export default class Window extends Component {
    componentDidMount(){
        let scene = new THREE.Scene();
        let camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );
        let renderer = new THREE.WebGLRenderer();
        renderer.setSize( window.innerWidth, window.innerHeight );
        let sceneContainer = document.getElementById("div-scene")
        sceneContainer.appendChild( renderer.domElement );

        var geometry = new THREE.BoxGeometry( 10, 10, 10 );
        var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        var shaderMaterial = new THREE.ShaderMaterial({
            uniforms:{
                time: {value: 1.0},
                resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
            },
            vertexShader: vsSource,
            fragmentShader: fsSource
        })
        

        let lineMaterial = new THREE.LineBasicMaterial( { color: 0x0000ff } );
        var cube = new THREE.Mesh( geometry, lineMaterial );

        let backGeometry = new THREE.BoxGeometry(window.innerWidth, window.innerHeight, 1);
        let background = new THREE.Mesh(backGeometry, shaderMaterial);
        background.position.copy(new THREE.Vector3(0,0,900));
        background.matrixAutoUpdate = false;
        background.updateMatrix();

        let lineGeometry = new THREE.Geometry();
        lineGeometry.vertices.push(new THREE.Vector3( -10, 0, 0) );
        lineGeometry.vertices.push(new THREE.Vector3( 0, 10, 0) );
        lineGeometry.vertices.push(new THREE.Vector3( 10, 0, 0) );

        var line = new THREE.Line( lineGeometry, lineMaterial );

        scene.add ( background );
        scene.add( cube );
        //scene.add( line );
        

        camera.position.set( 0, 0, -100 );
        camera.lookAt( 0, 0, 0 );

        
        this.animate(renderer, scene, camera, cube);
    }

    animate(renderer, scene, camera, cube) {
        requestAnimationFrame( ()=>this.animate(renderer, scene, camera, cube) );
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render( scene, camera );
    }

    

    render(){
        return(
            <div id="div-scene" className="scene-container">
            </div>
        );
    }
}