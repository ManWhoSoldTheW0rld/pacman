import {OBJECT_TYPE, DIRECTIONS, GRID_SIZE, CELL_SIZE} from './setup.js';
 
class Ghost {
    constructor(speed, startPos, movement, name, scaryTarget, scaryFunc) {
        this.name = name;
        this.movement = movement;
        this.startPos = startPos;
        this.pos = startPos;
        this.dir = DIRECTIONS.ArrowRight;
        this.speed = speed;
        this.timer = 0;
        this.isScared = false;
        this.rotation = false;
        this.ghostTop = 0;
        this.ghostLeft = 0;
        this.scaryTarget = scaryTarget;
        this.scaryFunc = scaryFunc;

        const div = document.createElement("div");
        div.classList.add("ghost", name);
        document.getElementById("game").prepend(div);

        this.div  = div;
        this.setToPosition(startPos);
    }

    setToPosition(position) {
       let top = Math.floor(position / GRID_SIZE);
       let left = position % GRID_SIZE;

       this.setDivPosition(position);

       this.div.style.left =  left * CELL_SIZE + "px";
       this.div.style.top = top * CELL_SIZE +"px";
    }

    shouldMove() {
        if (this.timer === this.speed) {
          this.timer = 0;
          return true;
        }
        this.timer++;
    }

    setDivPosition(position) {
        let top = Math.floor(position / GRID_SIZE);
        let left = position % GRID_SIZE;

        this.ghostTop = top * CELL_SIZE;
        this.ghostLeft = left * CELL_SIZE;
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
        }
        this.isScared = value;
    }
}


export default Ghost;
