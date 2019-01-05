import React, { Component } from 'react';
import breakoutShaderF from './vertex_shader';
import breakoutShaderV from './fragment_shader';
import {mat4} from 'gl-matrix';
import Game from './game';


export default class Breakout extends Component {
    componentDidMount(){
        const canvas = document.querySelector("#glCanvas");
        const gl = canvas.getContext("webgl");
        if(gl===null){
            alert("Unable to initialize WebGL. Your system does not support it.");
            return; 
        }
        const game = new Game(gl);
        game.Init();
        game.Render();
        // function render(now){
        //     now *= 0.001;
        //     const deltaTime = now - then;
        //     then = now;
        //     this.drawScene(gl, programInfo, buffers, deltaTime);
        //     requestAnimationFrame(render);
        // }
        // requestAnimationFrame(render);

        
    }

    render() {
        return(
            <canvas id="glCanvas" width={800} height={800}></canvas>
        );
    }
}

{/*<canvas id="glCanvas" width={Math.min(window.innerWidth*1, 400)} height={Math.min(window.innerHeight*1, 650)}></canvas>*/}