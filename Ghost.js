import {OBJECT_TYPE, DIRECTIONS} from './setup.js';

class Ghost {
    constructor(speed, startPos, movement, name) {
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

        const div = document.createElement("div");
        div.classList.add("ghost", name);
        document.getElementById("game").prepend(div);

        this.div  = div;
        this.setToPosition(startPos);
    }

    setToPosition(position) {
       //todo change to const
       let top = Math.floor(position / 20);
       let left = position % 20;

       this.ghostTop = top * 40;
       this.ghostLeft = left * 40;

       this.div.style.left =  left * 40 + "px";
       this.div.style.top = top * 40 +"px";
    }

    shouldMove() {
        if (this.timer === this.speed) {
          this.timer = 0;
          return true;
        }
        this.timer++;
      }
    
    getNextMove(objectExist, pacman) {
        // Call move algoritm here
        const { nextMovePos, direction } = this.movement(
          this.pos,
          this.dir,
          objectExist,
          pacman
        );

        let top = Math.floor(nextMovePos / 20);
        let left = nextMovePos % 20;

        this.ghostTop = top * 40;
        this.ghostLeft = left * 40;

        return { nextMovePos, direction };
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
