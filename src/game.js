import {L, I, S, A, T} from "./shapes"

class GameBlock {
    value = undefined;
    shape = undefined;
}

export default class Game {
    width = undefined
    height = undefined
    gameField =undefined
    currentShape = undefined
    constructor(width=10, height=20){
        this.width = width
        this.height = height
        this.gameField = [...Array(200).keys()].map((e, k)=> new GameBlock(0, null))
    }
    checkCompleteLines(){
        for(let i=0; i<this.gameField.length/this.height; i++){
            for(let j=0; j<this.width; j++){

            }
        }
    }

    tick() {
        this.checkCompleteLines()
        for(let i=0; i<this.gameField.length; i++){
            if(this.gameField[i%this.width].value === 0) {
                let temp = this.gameField[i]
                this.gameField[i] = this.gameField[i%this.width]
                this.gameField[i%this.width] = temp
            }
        }
    }

    rotateLeft(){
        this.currentShape.rotateLeft();
    }

    rotateRight(){
        this.currentShape.rotateRight();
    }

    generateRandomShape(){
        return Math.random()*6;
    }
} 