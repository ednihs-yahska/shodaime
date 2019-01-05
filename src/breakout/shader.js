import { glMatrix } from "gl-matrix";

export default class Shader {
    shaderProgram = undefined;
    gl = undefined;

    constructor(gl){
        this.gl = gl;
    }
    
    use(){
        this.gl.useProgram(this.shaderProgram);
        return this;
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

    compile(vertexSource, fragmentSource, geometrySource=undefined) {
        let vShader = undefined; 
        let fShader = undefined; 
        let gShader = undefined;

        vShader = this.loadShader(this.gl, this.gl.VERTEX_SHADER, vertexSource);
        fShader = this.loadShader(this.gl, this.gl.FRAGMENT_SHADER, fragmentSource);
        if(geometrySource){
            gShader = this.loadShader(this.gl, this.gl.GEOMETRY_SHADER, geometrySource);
        }

        this.shaderProgram = this.gl.createProgram();
        this.gl.attachShader(this.shaderProgram, vShader);
        this.gl.attachShader(this.shaderProgram, fShader);
        if(gShader){
            this.gl.attachShader(this.shaderProgram, gShader);
        }
        this.gl.linkProgram(this.shaderProgram);

        if(!this.gl.getProgramParameter(this.shaderProgram, this.gl.LINK_STATUS)){
            console.log('An error occured compiling the shaders: '+this.gl.getShaderInfoLog(this.shaderProgram));
            return null;
        }
    }

    setFloat(name, value, useShader){
        if(useShader){
            this.use();
        }
        this.gl.uniform1f(name, false, value);
    }

    setInteger(name, value, useShader){
        if(useShader){
            this.use();
        }
        const intLocation = this.gl.getUniformLocation(this.shaderProgram, name);
        this.gl.uniform1i(intLocation, false, value);
    }

    setVector2F(name, value, useShader){
        if(useShader){
            this.use();
        }
        this.gl.uniform2f(name, false, value);
    }

    setVector3F(name, value, useShader){
        if(useShader){
            this.use();
        }
        let location  = this.gl.getUniformLocation(this.shaderProgram, name);
        this.gl.uniform3f(location, value[0], value[1], value[2]);
    }

    setVector4F(name, value, useShader){
        if(useShader){
            this.use();
        }
        this.gl.uniform4f(name, false, value);
    }

    setVector4F(name, value, useShader){
        if(useShader){
            this.use();
        }
        this.gl.uniform4f(name, false, value);
    }

    setMatrix4(name, value, useShader){
        if(useShader){
            this.use();
        }
        let mat4Location = this.gl.getUniformLocation(this.shaderProgram, name);
        this.gl.uniformMatrix4fv(mat4Location, false, value);
    }

    checkCompileErrors(){
        if(!this.gl.getProgramParameter(this.shaderProgram, this.gl.LINK_STATUS)){
            console.log('An error occured compiling the shaders: '+this.gl.getShaderInfoLog(this.shaderProgram));
            return null;
        }
    }
}