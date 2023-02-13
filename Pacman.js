import {OBJECT_TYPE, DIRECTIONS, GRID_SIZE, CELL_SIZE} from './setup.js';

import Character from './Character.js';

class Pacman extends Character {
    constructor(speed, startPos) {

        super(speed, startPos, "pacman");

        this.powerPill = false;
        this.rotation = true;
    }

    getDiv() {
        const div = document.createElement("div");
        div.classList.add(this.name);
        document.getElementById("game").prepend(div);
        return div;
    }

    getNextMove(objectExist) {
        let nextMovePos = this.pos + this.dir.movement;
        if (objectExist(nextMovePos, OBJECT_TYPE.WALL) 
        || objectExist(nextMovePos, OBJECT_TYPE.GHOSTLAIR)) {
            nextMovePos = this.pos;
        } else if (nextMovePos == 220) {
            nextMovePos = 239;
        } else if (nextMovePos == 239) {
            nextMovePos = 220;
        }

        this.setDivPosition(nextMovePos);
        return {nextMovePos, direction : this.dir};
    }

    makeMove() {
        const classesToRemove = [OBJECT_TYPE.PACMAN];
        const classesToAdd = [OBJECT_TYPE.PACMAN];

        return {classesToRemove, classesToAdd};
    }

    rotate() {
        this.div.style.transform = `rotate(${this.dir.rotation}deg)`;
    }

    setNewPos(nextMovePos) {
        this.pos = nextMovePos;
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