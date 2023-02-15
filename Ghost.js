import {OBJECT_TYPE, DIRECTIONS} from './setup.js';
 
import Character from './Character.js';

class Ghost extends Character {
    constructor(speed, startPos, name, movement, scaryTarget, scaryFunc) {

        super(speed, startPos, name);
    
        this.movement = movement;
        this.startPos = startPos;
        this.dir = DIRECTIONS.ArrowRight;
        this.isScared = false;
        this.scaryTarget = scaryTarget;
        this.scaryFunc = scaryFunc;
    }

    getDiv() {
        const div = document.createElement("div");
        div.classList.add("ghost", this.name);
        document.getElementById("game").prepend(div);
        return div;
    }

    getNextMove(objectExist, pacman, ghosts) {
        if (this.isScared) {
            const { nextMovePos, direction } = this.scaryFunc(
                this.pos,
                this.dir,
                objectExist,
                this.scaryTarget,
            );

            this.setDivPosition(nextMovePos);
            return { nextMovePos, direction };

        } else {
            const { nextMovePos, direction } = this.movement(
                this.pos,
                this.dir,
                objectExist,
                pacman,
                ghosts
            );

            this.setDivPosition(nextMovePos);
            return { nextMovePos, direction };
        }
      }
    
    setNewPos(nextMovePos, direction) {
        this.pos = nextMovePos;
        this.dir = direction;
    }

    setIsScared(value) {
        if (value) {
            this.div.classList.add(OBJECT_TYPE.SCARED)
        } else {
            this.div.classList.remove(OBJECT_TYPE.SCARED)
            this.div.style.animation = "";
        }
        this.isScared = value;
        }  

    moveDiv() {
        super.moveDiv(this.dir);
    }
}

export default Ghost;
