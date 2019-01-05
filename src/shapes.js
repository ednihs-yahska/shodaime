class XY {
    x = undefined
    y = undefined

    constructor(x, y){
        this.x = x;
        this.y = y;

    }

    translate(x, y){
        return new XY(x, y)
    }
}

class Shape {
    anchor = undefined
    topLeft = undefined
    topRight = undefined
    bottomlLeft = undefined
    bottomRight = undefined
    bound = 4;
    constructor(anchor){
        this.anchor = anchor;
    }

    rotateRight(){
        // let definition = this.definition();
        // let newDifinition = definition;
        // const layers = this.bound;
        // const anchorX = this.anchor.x;
        // const anchorY = this.anchor.y;
        // const length = 4
        // const n = 4;
        // for(layer=0; layer<n/2;layer++){
        //     let first = layer;
        //     let last = n-1-layer;
        //     for(i=first;i<last;i++){
        //         let offset = i - first;
        //         top = x[first][i];
        //         x[first][i] = x[last-offset][first];
        //         x[last-offset][first] = x[last][last-offset]
        //         x[last][last-offset] = x[i][last];
        //         x[i][last]=top;
        //     }
        // }
    }

    rotateLeft(){
        // let definition = this.definition();
        // let newDifinition = definition;
        // const layers = this.bound;
        // const anchorX = this.anchor.x;
        // const anchorY = this.anchor.y;
        // const length = 4
        // const n = 4;
        // for(let layer=0; layer<n/2;layer++){
        //     let first = layer;
        //     let last = n-1-layer;
        //     for(let i=first;i<last;i++){
        //         let offset = i - first;
        //         top = x[first][i];
        //         x[first][i] = x[i][last];
        //         x[i][last]=x[last][last-offset];
        //         x[last][last-offset] = x[last-offset][first];
        //         x[last-offset][first] = top;   
        //     }
        // }
    }

    smashDown(){

    }
}

class L extends Shape {

    definition = (anchor)=>{
        //return [achor, anchor.translate(x, y+1), anchor.translate(x, y+2), anchor.translate(x+1, y+2)];
        return [];
    }

    rotateRight(){
         return [];
    }

    rotateLeft(){
        return [];
    }

}

class I extends Shape {
    definition = (anchor)=>{
        //return [achor, anchor.translate(x, y+1), anchor.translate(x, y+2), anchor.translate(x+1, y+2)];
        return [];   
    }
}

class S extends Shape {
    definition = (anchor)=>{
        //return [achor, anchor.translate(x+1, y), anchor.translate(x-1, y+1), anchor.translate(x, y+1)];
        return [];   
    }
}

class A extends Shape {
    definition = (anchor)=>{
        //return [achor, anchor.translate(x, y-1), anchor.translate(x+1, y-2), anchor.translate(x+2, y-1), anchor.translate(x+2, y) ];
        return [];   
    }
}

class T extends Shape {
    definition = (anchor)=>{
        //return [achor, anchor.translate(x+1, y), anchor.translate(x+2, y), anchor.translate(x+1, y+1)];
        return [];   
    }
}

export {L, I, S, A, T};