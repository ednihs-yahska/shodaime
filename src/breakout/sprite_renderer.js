import {mat4, mat3, mat2} from 'gl-matrix';

export default class SpriteRenderer {
    shader = undefined;
    quadVAO = undefined;
    gl=undefined;

    constructor(gl, shader){
        this.gl = gl;
        this.shader = shader;
        this.initRenderData()
    }

    drawSprite(texture, position, size, rotate, color){
        this.shader.use();
        let model = mat4.create();
        this.shader.setMatrix4('model', model);
        this.shader.setVector3F('spriteColor', color);

        //this.gl.activeTexture(this.gl.GL_TEXTURE0);
        //texture.bind();
        this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
    }

    initRenderData() {
        let vertices = [
        // Pos      // Tex
        0.0, 1.0, 0.0, 1.0,
        1.0, 0.0, 1.0, 0.0,
        0.0, 0.0, 0.0, 0.0, 
    
        0.0, 1.0, 0.0, 1.0,
        1.0, 1.0, 1.0, 1.0,
        1.0, 0.0, 1.0, 0.0
        ];

        let VBO = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, VBO);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(vertices), this.gl.STATIC_DRAW);
        let positionLoc = this.gl.getAttribLocation(this.shader.shaderProgram, 'vertex');
        this.gl.enableVertexAttribArray(positionLoc);
        this.gl.vertexAttribPointer(positionLoc, 4, this.gl.FLOAT, false, 0, 0);
    }
}