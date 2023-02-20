import {GRID_SIZE, CELL_SIZE, RIGHT_TUNNEL, LEFT_TUNNEL, DIRECTIONS} from './setup.js';
 
class Character {

    constructor(speed, startPos, name) {

        this.name = name;
        this.pos = startPos;
        this.speed = speed;
        this.dir = null;
        this.timer = 0;
        this.top = 0;
        this.left = 0;
        this.isStepDone = true;
        this.rotation = false;
        

        this.div  = this.getDiv();
        this.setToPosition(startPos, true);
    }

    getDiv() {
        return null;
    }

    shouldMove() {
        if (!this.dir) {
            return false;
        }

        if (this.timer === this.speed) {
            this.timer = 0;
            return true;
        }

        this.timer++;
    }

    setToPosition(position) {
        let top = Math.floor(position / GRID_SIZE);
        let left = position % GRID_SIZE;
 
        this.setNextPositionForAnimation(position);

        this.setTransform(left * CELL_SIZE, top * CELL_SIZE);

        this.currentLeft = this.left;
        this.currentTop = this.top;     
    }
 
     setNextPositionForAnimation(position) {
         let top = Math.floor(position / GRID_SIZE);
         let left = position % GRID_SIZE;
 
         this.top = top * CELL_SIZE;
         this.left = left * CELL_SIZE;
    }

    moveDiv(dir) {
        if (this.pos == RIGHT_TUNNEL || this.pos == LEFT_TUNNEL) {
            this.setToPosition(this.pos)
        }

        if (dir !== null) {
            if (dir.code == DIRECTIONS.ArrowLeft.code) {
                let newLeft = parseInt(this.currentLeft) - CELL_SIZE / this.speed; 
                if (newLeft >= this.left) {

                    this.setTransform(newLeft, this.top);

                    this.currentLeft = newLeft;
                    this.isStepDone = (newLeft === this.left);
                }
            } else if (dir.code == DIRECTIONS.ArrowUp.code) {
                let newTop = parseInt(this.currentTop) - CELL_SIZE / this.speed;
                if (newTop >= this.top) {

                    this.setTransform(this.left, newTop);

                    this.currentTop = newTop;
                    this.isStepDone = newTop === this.top;
                }
            } else if (dir.code == DIRECTIONS.ArrowRight.code) {
                let newLeft = parseInt(this.currentLeft) +  CELL_SIZE / this.speed; 
                if (newLeft <= this.left) {

                    this.setTransform(newLeft, this.top);

                    this.currentLeft = newLeft;
                    this.isStepDone = (newLeft === this.left);
                }
            } else if (dir.code == DIRECTIONS.ArrowDown.code) {
                let newTop = parseInt(this.currentTop) + CELL_SIZE / this.speed;
                if (newTop <= this.top) {
                    this.setTransform(this.left, newTop);

                    this.currentTop = newTop;
                    this.isStepDone = (newTop === this.top);
                }
            }
        }
    }

    setTransform(left, top) {
        this.div.style.transform = `translate(${left}px,${top}px)`;
        if (this.rotation && this.dir) {
            this.div.style.transform = this.div.style.transform  +  `rotate(${this.dir.rotation}deg)`;
        }
    }
}

export default Character;