import {GRID_SIZE, CELL_SIZE, RIGHT_TUNNEL, LEFT_TUNNEL} from './setup.js';
 
class Character {

    constructor(speed, startPos, name) {

        this.name = name;
        this.pos = startPos;
        this.speed = speed;
        this.dir = null;
        this.timer = 0;
        this.top = 0;
        this.left = 0;

        this.div  = this.getDiv();
        this.setToPosition(startPos);
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
 
        this.setDivPosition(position);
 
        this.div.style.left =  left * CELL_SIZE + "px";
        this.div.style.top = top * CELL_SIZE +"px";
    }
 
     setDivPosition(position) {
         let top = Math.floor(position / GRID_SIZE);
         let left = position % GRID_SIZE;
 
         this.top = top * CELL_SIZE;
         this.left = left * CELL_SIZE;
    }

    moveDiv() {
        if (this.pos == RIGHT_TUNNEL || this.pos == LEFT_TUNNEL) {
            this.setToPosition(this.pos)
        }

        if (this.dir !== null) {
            if (this.dir.code == 37  && parseInt(this.div.style.left) >= this.left + CELL_SIZE / this.speed) {
                this.div.style.left = (parseInt(this.div.style.left) - CELL_SIZE / this.speed) + "px";
            } else if (this.dir.code == 38 && parseInt(this.div.style.top) >= this.top + CELL_SIZE / this.speed) {
                this.div.style.top = (parseInt(this.div.style.top) - CELL_SIZE / this.speed) + "px";
            } else if (this.dir.code == 39 && parseInt(this.div.style.left) <= this.left - CELL_SIZE / this.speed) {
                this.div.style.left = (parseInt(this.div.style.left) + CELL_SIZE / this.speed) + "px";
            } else if (this.dir.code == 40 && parseInt(this.div.style.top) <= this.top - CELL_SIZE / this.speed) {
                this.div.style.top = (parseInt(this.div.style.top) + CELL_SIZE / this.speed) + "px";
            }
        }
    }
}

export default Character;