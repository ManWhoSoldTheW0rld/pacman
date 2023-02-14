import {OBJECT_TYPE, DIRECTIONS, RIGHT_TUNNEL, LEFT_TUNNEL, CELL_SIZE} from './setup.js';

import Character from './Character.js';

class Pacman extends Character {
    constructor(speed, startPos) {

        super(speed, startPos, "pacman");

        this.powerPill = false;
        this.rotation = true;
        this.prevDir = null;
    }

    getDiv() {
        const div = document.createElement("div");
        div.classList.add(this.name);
        document.getElementById("game").prepend(div);
        return div;
    }

    getNextMove(objectExist) {
        let nextMovePos = this.pos + this.dir.movement;

        if (this.pos == LEFT_TUNNEL && this.dir == DIRECTIONS.ArrowLeft) {
            nextMovePos = RIGHT_TUNNEL;
        } else if (this.pos == RIGHT_TUNNEL && this.dir == DIRECTIONS.ArrowRight) {
            nextMovePos = LEFT_TUNNEL;
        } else if (objectExist(nextMovePos, OBJECT_TYPE.WALL) 
        || objectExist(nextMovePos, OBJECT_TYPE.GHOSTLAIR)) {
            nextMovePos = this.pos;
        }

        this.setDivPosition(nextMovePos);

        return {nextMovePos, direction : this.dir};
    }

    rotate() {
        this.div.style.transform = `rotate(${this.dir.rotation}deg)`;
    }

    setNewPos(nextMovePos) {
        this.pos = nextMovePos;
    }

    moveDiv() {
        if (this.isStepDone || (this.prevDir == null)) {
            this.prevDir = this.dir;
        }

        super.moveDiv(this.prevDir);
    }

    handleKeyInput = (e, objectExist) => {
        let dir;
    
        if (e.keyCode >= 37 && e.keyCode <= 40) {
          dir = DIRECTIONS[e.key];
        } else {
          return;
        }
    
        const nextMovePos = this.pos + dir.movement;
        if (objectExist(nextMovePos, OBJECT_TYPE.WALL)) return;
        this.dir = dir;
    };
}

export default Pacman;