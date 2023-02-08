import {GRID_SIZE, CELL_SIZE, OBJECT_TYPE, CLASS_LIST} from './setup.js';

class GameBoard {
    constructor(DOMGrid) {
        this.dotCount = 0;
        this.grid = [];
        this.DOMGrid = DOMGrid;
    }

    showGameStatus(gameWin) {
        const div = document.createElement('div');
        div.classList.add('game-status');
        div.innerHTML = `${gameWin ? "WIN!" : "GAME OVER!"}`;
        this.DOMGrid.appendChild(div);
    }

    createGrid(level) {
        this.dotCount = 0;
        this.grid = [];
        this.DOMGrid.innerHTML = "";
        this.DOMGrid.style.cssText = `grid-template-columns: repeat(${GRID_SIZE}, ${CELL_SIZE}px);`;

        level.forEach((square, i) => {
                const div = document.createElement('div');
                div.id = i
                div.classList.add('square', CLASS_LIST[square]);
                this.DOMGrid.appendChild(div);
                this.grid.push(div);
            if (CLASS_LIST[square] === OBJECT_TYPE.DOT) {
                this.dotCount++;
            }
            i++
        });
    }

    createMaze(level){
        level.forEach((square, i) => {
            if (square >= 10 && square < 24){
                document.getElementById(i).classList.add(CLASS_LIST[1]);
            } else if (square == 24){
                document.getElementById(i).classList.add(CLASS_LIST[9]);
            }
            if (square >= 12 && square <= 15 || square == 24){
                const innerDiv = document.createElement('div');
                innerDiv.classList.add(CLASS_LIST[square]+'_2');
                document.getElementById(i).appendChild(innerDiv);
            }
            if (square == 20 || square == 21){
                const innerDiv = document.createElement('div');
                const innerDiv2 = document.createElement('div');
                innerDiv.classList.add(CLASS_LIST[square]+'_2');
                innerDiv2.classList.add(CLASS_LIST[square]+'_3');
                document.getElementById(i).appendChild(innerDiv);
                document.getElementById(i).appendChild(innerDiv2);
            }
            i++
        })

    }

    addObject(pos, classes) {
        this.grid[pos].classList.add(...classes);
    }

    removeObject(pos, classes) {
        this.grid[pos].classList.remove(...classes);
    }

      
    objectExist = (pos, object) => {
        return this.grid[pos].classList.contains(object);
    };
    
    rotateDiv(pos, deg) {
        this.grid[pos].style.transform = `rotate(${deg}deg)`;
    }

    moveCharacter(character) {
        if (character.shouldMove()) {
            const { nextMovePos, direction} = character.getNextMove(
                this.objectExist
            )

            const {classesToRemove, classesToAdd} = character.makeMove();

            if (character.rotation && nextMovePos !== character.pos) {
                this.rotateDiv(nextMovePos, character.dir.rotation);
                this.rotateDiv(character.pos, 0);
            }

            this.removeObject(character.pos, classesToRemove);
            this.addObject(nextMovePos, classesToAdd);

            character.setNewPos(nextMovePos, direction);
        }
    }

    static createGameBoard(DOMGrid, level) {
        const board = new this(DOMGrid);
        board.createGrid(level);
        board.createMaze(level)
        return board;
    }
}

export default GameBoard;