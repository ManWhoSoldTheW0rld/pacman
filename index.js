import {LEVEL, OBJECT_TYPE, GRID_SIZE, GRID_LENGHT, CELL_SIZE} from './setup.js';
import {blinky, pinky, inky, clyde, scared} from './ghostmoves.js';

import GameBoard from './GameBoard.js';
import Pacman from './Pacman.js';
import Ghost from './Ghost.js';

//Sounds
 const soundDot = './sounds/munch.wav';
 const soundPill = './sounds/pill.wav';
 const soundGameStart = './sounds/game_start.wav';
 const soundGameOver = './sounds/death.wav';
 const soundGhost = './sounds/eat_ghost.wav';

//DOM Elements
const gameGrid = document.querySelector('#game');
const scoreTable = document.querySelector('#score');
const livesTable = document.getElementsByClassName('lives');
const timeTable = document.querySelector('#time');
const instructions = document.getElementsByClassName('instructions');

//Game Const
const POWER_PILL_TIME = 10000; //ms
const GLOBAL_SPEED = 80; //ms
const gameBoard = GameBoard.createGameBoard(gameGrid, LEVEL);

//Initial Setup
let score = 0;
let previousScore = 0;
let gameWin = false;
let powerPillActive = false;
let powerPillTimer = null;
let previousTimeStamp;
let isGameOver = false;
let isGameStarted = false;
let isGamePaused = false;
let time = 600;

//Audio
// function playAudio(audio) {
//     const soundEffect = new Audio(audio);
//     soundEffect.play();
// }

const gameOver = (pacman) => {
    previousScore = score

    isGameOver = true;
    // playAudio(soundGameOver);
    document.removeEventListener('keydown', e => {
        pacman.handleKeyInput(e, gameBoard.objectExist);
    });

    livesTable[0].parentNode.removeChild(livesTable[0])


    if (gameWin == false && livesTable.length > 0){
        if (livesTable.length == 0){
            gameBoard.showGameStatus(gameWin)
        } else {
            setTimeout(() => {startGame()}, 3000)
        }
    } else {
        gameBoard.showGameStatus(gameWin)
    }

    isGameStarted = false;
    //todo error after last life
    clearInterval(timer);
}

const checkCollision = (pacman, ghosts) => {

    //todo redo collision
    // console.log("pac", pacman.pos, pacman.left, pacman.top);
    // ghosts.forEach((ghost) => {
    //     console.log("gho", ghost.pos, ghost.left, ghost.top, ghost.name);
    // });

    const collidedGhost = ghosts.find((ghost) => pacman.pos === ghost.pos);

    if (collidedGhost) {
        if (pacman.powerPill && collidedGhost.isScared) {
            // playAudio(soundGhost);
            collidedGhost.setToPosition(collidedGhost.startPos);
            collidedGhost.pos = collidedGhost.startPos;
            collidedGhost.setIsScared(false);
            score += 100;
        } else {
            gameBoard.removeObject(pacman.pos, [OBJECT_TYPE.PACMAN]);
            gameBoard.rotateDiv(pacman.pos, 0);
            gameOver(pacman, gameGrid);
        }
    }
}

const gameLoop = (timestamp, pacman, ghosts = null) => {

    // Check if game over
    if (isGameOver) {
        return;
    }

    // Check if game is paused
    gameBoard.showGamePaused(isGamePaused)

    // Check that all characters moving with global speed and not moving while pause
    if ((timestamp < previousTimeStamp + GLOBAL_SPEED) || isGamePaused) {
        window.requestAnimationFrame(function(timestamp) {
            gameLoop(timestamp, pacman, ghosts);
        });

        return;
    }
 
    previousTimeStamp = timestamp;

    // 1. Move Pacman
    gameBoard.movePacman(pacman);
    pacman.moveDiv();
    
    // 2. Check Ghost collision on the old positions
    checkCollision(pacman, ghosts);

    // 3. Move ghosts
    ghosts.forEach((ghost) => {
        gameBoard.moveGhost(ghost, pacman, ghosts);
        ghost.moveDiv();
    });

     // 4. Do a new ghost collision check on the new positions
    checkCollision(pacman, ghosts);

    // 5. Check if Packman eats a dot
    if (gameBoard.objectExist(pacman.pos, OBJECT_TYPE.DOT)) {
        // playAudio(soundDot);
        gameBoard.removeObject(pacman.pos, [OBJECT_TYPE.DOT]);
        
        gameBoard.dotCount--;
        score +=10;
    }

    // 6. Check if Packman eats a pill
    if (gameBoard.objectExist(pacman.pos, OBJECT_TYPE.PILL)) {
        // playAudio(soundPill);
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
        ghosts.forEach((ghost) => (ghost.setIsScared(pacman.powerPill)));
    }

    if (gameBoard.dotCount === 0) {
        gameWin = true;
        gameOver(pacman, ghosts);
    }

    //Show the score
    scoreTable.innerHTML = score;

    // Update countdown time
    timeTable.innerHTML = Math.round(time--/10)

    window.requestAnimationFrame(function(timestamp) {
        gameLoop(timestamp, pacman, ghosts);
    });
}

const startGame = () => {
    // playAudio(soundGameStart);
    gameWin = false;
    powerPillActive = false;
    if (previousScore != 0){
        score = previousScore
    }
    // score = 0;
    isGameOver = false;

    if (livesTable.length == 0) {
        gameBoard.createLivesTable()
    }

    instructions[0].classList.add("hide")
    instructions[1].classList.add("hide")
    document.getElementById('lives').classList.remove('hide')
    
    gameBoard.createGrid(LEVEL);
    gameBoard.createMaze(LEVEL);

    const pacman = new Pacman(2, 287);

    document.addEventListener('keydown', (e) => {
        pacman.handleKeyInput(e, gameBoard.objectExist)
    });

    const ghosts = [
        new Ghost(4, 188, OBJECT_TYPE.BLINKY, blinky, 0, scared),
        new Ghost(5, 209, OBJECT_TYPE.PINKY, pinky, GRID_SIZE -1, scared),
        new Ghost(4, 230, OBJECT_TYPE.INKY, inky, GRID_SIZE * (GRID_LENGHT -1), scared),
        new Ghost(5, 251, OBJECT_TYPE.CLYDE, clyde, GRID_SIZE * GRID_LENGHT -1, scared)
    ];

    // Gameloop
    gameLoop(0, pacman, ghosts);   
}

//Initialize game
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !isGameStarted){
        isGameStarted = true;
        startGame();
    }

    if (e.key === 'p' && isGameStarted && !isGamePaused){
        isGamePaused = true
    } else if (e.key === 'p' && isGameStarted && isGamePaused){
        isGamePaused = false
    }
})