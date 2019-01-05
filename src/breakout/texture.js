function isPowerOf2(value) {
    return (value & (value - 1)) == 0;
}

export default class Texture {
    width = 0;
    height = 0;
    wrapS = undefined;
    wrapT = undefined;
    filterMin = undefined;
    filterMax = undefined;
    texture = undefined;
    gl = undefined;

    constructor(gl){
        this.gl = gl;
        this.texture = this.gl.createTexture();
    }  
    
    generate(image, srcType, level=0) {
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
        this.gl.texImage2D(this.gl.TEXTURE_2D, level, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, image);
        if(isPowerOf2(image.width) && isPowerOf2(image.height)){
            this.gl.generateMipmap(this.gl.TEXTURE_2D);
        }
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);
    }

    bind(){
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
    }


}