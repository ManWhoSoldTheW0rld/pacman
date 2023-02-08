import {LEVEL, OBJECT_TYPE} from './setup.js';
import { randomMovement } from './ghostmoves.js';

import GameBoard from './GameBoard.js';
import Pacman from './Pacman.js';
import Ghost from './Ghost.js';

//Sounds
 const soundDot = './sounds/munch.wav';
 const  soundPill = './sounds/pill.wav';
 const  soundGameStart = './sounds/game_start.wav';
 const  soundGameOver = './sounds/death.wav';
 const  soundGhost = './sounds/eat_ghost.wav';

//DOM Elements
const gameGrid = document.querySelector('#game');
const scoreTable = document.querySelector('#score');
const startButton = document.querySelector('#start-button');

//Game Const
const POWER_PILL_TIME = 10000; //ms
const GLOBAL_SPEED = 80; //ms
const gameBoard = GameBoard.createGameBoard(gameGrid, LEVEL);

//Initial Setup
let score = 0;
let timer = null;
let gameWin = false;
let powerPillActive = false;
let powerPillTimer = null;

//Audio
function playAudio(audio) {
    const soundEffect = new Audio(audio);
    soundEffect.play();
}

const gameOver = (pacman, grid) => {
    playAudio(soundGameOver)
    document.removeEventListener('keydown', e => {
        pacman.handleKeyInput(e, gameBoard.objectExist);
    });

    gameBoard.showGameStatus(gameWin);
    clearInterval(timer);
    startButton.classList.remove('hide');
}

const checkCollision = (pacman, ghosts) => {
    const collidedGhost = ghosts.find((ghost) => pacman.pos === ghost.pos);

    if (collidedGhost) {
        if (pacman.powerPill) {
            playAudio(soundGhost);
            gameBoard.removeObject(collidedGhost.pos, [OBJECT_TYPE.GHOST, OBJECT_TYPE.SCARED, collidedGhost.name]);
            collidedGhost.pos = collidedGhost.startPos;
            score += 100;
        } else {
            gameBoard.removeObject(pacman.pos, [OBJECT_TYPE.PACMAN]);
            gameBoard.rotateDiv(pacman.pos, 0);
            gameOver(pacman, gameGrid);
        }
    }
}

const gameLoop = (pacman, ghosts = null) => {
    // 1. Move Pacman
    gameBoard.moveCharacter(pacman);
    // 2. Check Ghost collision on the old positions
    checkCollision(pacman, ghosts);
    // 3. Move ghosts
    ghosts.forEach((ghost) => gameBoard.moveCharacter(ghost));
     // 4. Do a new ghost collision check on the new positions
    checkCollision(pacman, ghosts);

    //Check if Packman eats a dot
    if (gameBoard.objectExist(pacman.pos, OBJECT_TYPE.DOT)) {
        playAudio(soundDot);
        gameBoard.removeObject(pacman.pos, [OBJECT_TYPE.DOT]);
        gameBoard.dotCount--;
        score +=10;
    }
    if (gameBoard.objectExist(pacman.pos, OBJECT_TYPE.PILL)) {
        playAudio(soundPill);
        gameBoard.removeObject(pacman.pos, [OBJECT_TYPE.PILL]);

        pacman.powerPill = true;
        score += 50;

        clearTimeout(powerPillTimer);
        powerPillTimer = setTimeout(
            () => (pacman.powerPill = false),
            POWER_PILL_TIME
         );
    }

    // 7. Change ghost scare mode depending on powerpill
    if (pacman.powerPill !== powerPillActive) {
        powerPillActive = pacman.powerPill;
        ghosts.forEach((ghost) => (ghost.isScared = pacman.powerPill));
    }

    if (gameBoard.dotCount === 0) {
        gameWin = true;
        gameOver(pacman, ghosts);
    }

    //Show the score
    scoreTable.innerHTML = score;
}

const startGame = () => {
    playAudio(soundGameStart);
    gameWin = false;
    powerPillActive = false;
    score = 0;

    startButton.classList.add("hide");
    gameBoard.createGrid(LEVEL);
    gameBoard.createMaze(LEVEL);

    const pacman = new Pacman(2, 287);

    gameBoard.addObject(287, [OBJECT_TYPE.PACMAN]);
    document.addEventListener('keydown', (e) => {
        pacman.handleKeyInput(e, gameBoard.objectExist)
    });

    const ghosts = [
        new Ghost(2, 188, randomMovement, OBJECT_TYPE.BLINKY),
        new Ghost(3, 209, randomMovement, OBJECT_TYPE.PINKY),
        new Ghost(4, 230, randomMovement, OBJECT_TYPE.INKY),
        new Ghost(5, 251, randomMovement, OBJECT_TYPE.CLYDE)
    ];

     // Gameloop
  timer = setInterval(() => gameLoop(pacman, ghosts), GLOBAL_SPEED);
}

//Initialize game
startButton.addEventListener('click', startGame);