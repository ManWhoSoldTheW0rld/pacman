import {GRID_SIZE, CELL_SIZE, OBJECT_TYPE, CLASS_LIST} from './setup.js';

class GameBoard {
    constructor(DOMGrid) {
        this.dotCount = 0;
        this.pillCount = 0;
        this.grid = [];
        this.DOMGrid = DOMGrid;
        this.pauseDiv = document.getElementById('pause');
        this.gameWinDiv = document.getElementById('game_win');
    }

    showGameStatus(gameWin) {
        this.gameWinDiv.innerHTML = `${gameWin ? "YOU WON! PRESS \"ENTER\" TO START A NEW GAME!" : "GAME OVER! PRESS \"ENTER\" TO START A NEW GAME!"}`;
        this.gameWinDiv.classList.remove('hide');
    }

    showGamePaused(isPaused){
        if (isPaused){
            this.pauseDiv.classList.remove('hide');
        } else {
            this.pauseDiv.classList.add('hide');
        }
    }

    createGrid(level) {
        this.dotCount = 0;
        this.pillCount = 0;
        this.grid = [];
        this.DOMGrid.innerHTML = "";
        this.DOMGrid.style.cssText = `grid-template-columns: repeat(${GRID_SIZE}, ${CELL_SIZE}px);`;

        level.forEach((square, i) => {
                const div = document.createElement('div');
                div.id = i;
                div.classList.add('square', CLASS_LIST[square]);
                this.DOMGrid.appendChild(div);
                this.grid.push(div);
            if (CLASS_LIST[square] === OBJECT_TYPE.DOT) {
                this.dotCount++;
            } else if (CLASS_LIST[square] === OBJECT_TYPE.PILL){
                this.pillCount++;
            }
            i++;
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
            i++;
        });

    }

    createLivesTable(){
        let lives = document.getElementById('lives');
        for (let i = 1; i < 4; i++){
            let life = document.createElement('div');
            life.classList.add('lives');
            life.classList.add('life');
            life.innerHTML = `<img src="./media/pacmanlives.png" width="50px">`;
            lives.appendChild(life);
        }
        let lastLife = document.createElement('div');
        lastLife.classList.add('lives');
        lastLife.classList.add('life')
        lastLife.classList.add('hide');
        lastLife.innerHTML = `<img src="./media/pacman-last_life.gif" width="50px">`;
        lives.appendChild(lastLife);
    }

    deleteLivesTable(){
        let lives = document.getElementsByClassName('life');
        for (let i = 0; i <= lives.length; i++){
            lives[0].parentNode.removeChild(lives[0]);
        }
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

    moveGhost(character, pacman, ghosts) {
        if (character.shouldMove()) {
            const { nextMovePos, direction} = character.getNextMove(
                this.objectExist, 
                pacman,
                ghosts
            );
            //todo add moving logic here
            character.setNewPos(nextMovePos, direction);
        }
    }

    movePacman(character) {
        if (character.shouldMove()) {
            const { nextMovePos, direction} = character.getNextMove(
                this.objectExist
            );

            if (character.rotation && nextMovePos !== character.pos) {
                character.rotate();    
            }

            character.setNewPos(nextMovePos, direction);
        }
    }

    static createGameBoard(DOMGrid, level) {
        const board = new this(DOMGrid);
        board.createGrid(level);
        board.createMaze(level);
        board.createLivesTable();
        return board;
    }
}

export default GameBoard;