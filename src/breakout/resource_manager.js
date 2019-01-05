import Shader from './shader'
import Texture from  './texture'


export default class ResourceManager {
    shaders = [];
    textures = [];
    gl = undefined;
    constructor(gl){
        this.gl = gl;
    }
    loadShader(vShader, fShader, gShader, name){
        this.shaders[name] = this.loadShaderFromFile(vShader, fShader, gShader);
        return this.shaders[name]
    }

    getShader(name){
        return this.shaders[name]
    }

    async loadTexture(file, alpha, name){
        this.textures[name] = await this.loadTextureFromFile(file, alpha);
        return this.textures[name];
    }

    getTexture(name) {
        return this.textures[name];
    }

    clear(){
        for(let shader in this.shaders){
            this.gl.deleteProgram(shader)
        }

        for(let texture in this.textures){
            this.gl.deleteTextures(1, texture)
        }
    }

    loadShaderFromFile(vShader, fShader, gShader) {
        let shader = new Shader(this.gl)
        shader.compile(vShader, fShader, gShader)
        return shader;
    }

    async loadTextureFromFile(file) {
        let texture = new Texture(this.gl);
        let url = "http://localhost:3000"+file;
        return new Promise((resolve, reject) => {
            let img = new Image();
            img.addEventListener('load', e => {
                texture.width = img.width;
                texture.height = img.height;
                texture.generate(img, this.gl.UNSIGNED_BYTE);
                resolve(img)
            });
            img.addEventListener('error', () => {
              reject(new Error(`Failed to load image's URL: ${url}`));
            });
            img.src = url
        });
    }
}