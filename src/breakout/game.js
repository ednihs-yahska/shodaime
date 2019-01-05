import {mat4, mat2, mat3} from 'gl-matrix';
import ResourceManager from './resource_manager';
import SpriteRenderer from './sprite_renderer';
import breakoutShaderV from './vertex_shader';
import breakoutShaderF from './fragment_shader';
import face from './awesomeface.png'

export default class Game
{
        State = {GAME_ACTIVE: 1, GAME_MENU: 2, GAME_END: 3};	
        Keys = new Array(1024);
        Width=undefined;
        Height=undefined;
        gl = undefined;
        renderer = undefined;
        resourceManager = undefined;
        // Constructor/Destructor
        constructor(gl, width=800, height=800) {
            this.gl = gl;
            this.Width = width;
            this.Height = height;
            Object.freeze(this.State);
        }
        // Initialize game state (load all shaders/textures/levels)
        async Init() {
            this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
            let projection = mat4.create()
            this.resourceManager = new ResourceManager(this.gl);
            mat4.ortho(
                projection,
                -1.0, 1.0, -1.0, 1.0, -1.0, 1.0
            );
            this.resourceManager.loadShader(breakoutShaderV, breakoutShaderF, null, "sprite");
            this.resourceManager.getShader("sprite").use().setInteger("image", 0);
            this.resourceManager.getShader("sprite").setMatrix4("projection", projection);
            //await this.resourceManager.loadTexture(face, true, "face");
            this.renderer = new SpriteRenderer(this.gl, this.resourceManager.getShader("sprite"));
        }
        // GameLoop
        ProcessInput(dt) {

        }
        Update(dt) {

        }
        Render() {
            if(this.renderer){
                this.renderer.drawSprite(this.resourceManager.getTexture("face"), [200, 200], [300, 400], 45.0, [0.0, 1.0, 0.0]);
            }
        }
};