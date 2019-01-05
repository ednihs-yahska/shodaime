import React, { Component } from 'react';
import tetrisShaderV from './vertex_shader';
import tetrisShaderF from './fragment_shader';
import {mat4} from 'gl-matrix';
import Game from "./game";

export default class Tetris extends Component {
    componentDidMount(){
        const canvas = document.querySelector("#glCanvas");
        const gl = canvas.getContext("webgl");

        if(gl===null){
            alert("Unable to initialize WebGL. Your system does not support it.");
            return; 
        }
        const tetrisShader = this.initShaderProgram(gl, tetrisShaderV, tetrisShaderF);

        const programInfo = {
            program: tetrisShader,
            attribLocations: {
                vertexPositions: gl.getAttribLocation(tetrisShader, 'aVertexPosition'),
            },
            uniformLocations: {
                    projectionMatrix: gl.getUniformLocation(tetrisShader, 'uProjectionMatrix'),
                    modelViewMatrix: gl.getUniformLocation(tetrisShader, 'uModelViewMatrix')
            }
        }

        const buffers = this.initBuffers(gl);

        let then = 0;

        function render(now){
            now *= 0.001;
            const deltaTime = now - then;
            then = now;
            this.drawScene(gl, programInfo, buffers, deltaTime);
            requestAnimationFrame(render);
        }
        requestAnimationFrame(render);

        
    }

    initBuffers(gl){
        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

        let gameField = [... new Array(200)].map(()=>1);


        const positions = [
            10.0, 10.0, 0,
            -10.0, 10.0, 0,
            10.0, -10.0, 0,
            -10.0, -10.0, 0
        ];

        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

        return {
            position: positionBuffer
        }
    }

    initShaderProgram(gl, vsSource, fsSource){
        const vertexShader = this.loadShader(gl, gl.VERTEX_SHADER, vsSource);
        const fragmentShader = this.loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

        const shaderProgram = gl.createProgram();
        gl.attachShader(shaderProgram, vertexShader);
        gl.attachShader(shaderProgram, fragmentShader);
        gl.linkProgram(shaderProgram);

        if(!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)){
            console.log('An error occured compiling the shaders: '+gl.getShaderInfoLog(shaderProgram));
            return null;
        }
        return shaderProgram;
    }

    loadShader(gl, type, source){
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);

        if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            alert('An error occured compiling the shaders: '+gl.getShaderInfoLog(shader));
            gl.deleteShader(shader);
            return null;
        }
        return shader;
    }

    drawScene(gl, programInfo, buffer, deltaTime){
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clearDepth(1.0);
        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LEQUAL);

        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        const fieldOfView = 45 * Math.PI/180;
        const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
        const zNear = 0.1;
        const zFar = 100.0;
        const projectionMatrix = mat4.create();
        
        mat4.perspective(
            projectionMatrix,
            fieldOfView,
            aspect,
            zNear,
            zFar
        );

        const modelViewMatrix = mat4.create();

        mat4.translate(modelViewMatrix, modelViewMatrix, [-0.0, 0.0, -50.0]);
        mat4.rotate(modelViewMatrix, modelViewMatrix, (-45*Math.PI)/180, [1.0, 0.0, 0.0])

        {
            const numComponents = 3;
            const type = gl.FLOAT;
            const normalize = false;
            const stride = 0;
            const offset = 0;

            gl.bindBuffer(gl.ARRAY_BUFFER, buffer.position);

            gl.vertexAttribPointer(
                programInfo.attribLocations.vertexPosition,
                numComponents,
                type,
                normalize,
                stride,
                offset
            );

            gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
            gl.useProgram(programInfo.program);

            gl.uniformMatrix4fv(
                programInfo.uniformLocations.projectionMatrix,
                false,
                projectionMatrix
            );

            gl.uniformMatrix4fv(
                programInfo.uniformLocations.modelViewMatrix,
                false,
                modelViewMatrix
            );
        }

        {
            const offset = 0;
            const vertexCount = 4;
            gl.drawArrays(gl.TRIANGLE_STRIP, offset, vertexCount);
        }
    }

    render() {
        return(
            <canvas id="glCanvas" width={Math.min(window.innerWidth*0.6, 400)} height={Math.min(window.innerHeight*0.8, 650)}></canvas>
        );
    }
}