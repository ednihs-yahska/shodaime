import React, { Component } from 'react';
import vsSource from './vertex_shader';
import fsSource from './fragment_shader';
import {mat4} from 'gl-matrix';
import logo from './logo.svg';
//import * as THREE from 'three';
import regular_helvetika from './theeJsFonts/helvetiker_regular.typeface.json';
let THREE = window.THREE = require('three');
require('three/examples/js/loaders/GLTFLoader.js');


let GLTFLoader = window.GLTFLoader;

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

        var skullShaderMaterial = new THREE.ShaderMaterial({
            uniforms:{
                texture: {
                    type: "t",
                    value: THREE.ImageUtils.loadTexture( "models/skull/textures/defaultMat_baseColor.jpg" ),
                }
            }
        })
        

        let lineMaterial = new THREE.LineBasicMaterial( { color: 0x0000ff } );
        var cube = new THREE.Mesh( geometry, lineMaterial );

        let backGeometry = new THREE.BoxGeometry(window.innerWidth, window.innerHeight, 1);
        let background = new THREE.Mesh(backGeometry, shaderMaterial);
        background.position.copy(new THREE.Vector3(0,0,900));
        background.matrixAutoUpdate = false;
        background.updateMatrix();

        var light = new THREE.AmbientLight( 0x404040 ); // soft white light
        scene.add( light );

        var light = new THREE.PointLight( 0xff0000, 1, 100 );
        light.position.set( 0, 0, -50 );
        scene.add( light );

        let lineGeometry = new THREE.Geometry();
        lineGeometry.vertices.push(new THREE.Vector3( -10, 0, 0) );
        lineGeometry.vertices.push(new THREE.Vector3( 0, 10, 0) );
        lineGeometry.vertices.push(new THREE.Vector3( 10, 0, 0) );

        var line = new THREE.Line( lineGeometry, lineMaterial );
        let loader = new THREE.FontLoader();
        let text = undefined;
        loader.load( 'theeJsFonts/helvetiker_regular.typeface.json', function ( font ) {

            let textGeometry = new THREE.TextGeometry( 'Akshay', {
                font: font,
                size: 5,
                height: 5,
                curveSegments: 12,
                bevelEnabled: false,
                bevelThickness: 10,
                bevelSize: 8,
                bevelSegments: 5
            } );
            text = new THREE.Mesh(textGeometry, new THREE.MeshBasicMaterial({color: 0x0000ff}));
            text.rotation.y += Math.PI;
            //scene.add(text);
        } );

        let objLoader = new THREE.GLTFLoader();

        objLoader.load( 'models/skull/scene.gltf', function ( gltf ) {
            gltf.scene.children[0].scale.set(15,15,15);
            //gltf.scene.children[0].material = skullShaderMaterial;
            scene.add( gltf.scene.children[0] );
        
        }, undefined, function ( error ) {
        
            console.error( error );
        
        } );

        scene.add ( background );
        //scene.add( cube );
        //scene.add( line );
        

        camera.position.set( 0, 0, -100 );
        camera.lookAt( 0, 0, 0 );

        
        this.animate(renderer, scene, camera, cube, text);
    }

    animate(renderer, scene, camera, cube, text) {
        requestAnimationFrame( ()=>this.animate(renderer, scene, camera, cube, text) );
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