import {LEVEL, OBJECT_TYPE, GRID_SIZE, GRID_LENGHT, CELL_SIZE} from './setup.js';
import {blinky, pinky, inky, clyde, scared} from './ghostmoves.js';

import GameBoard from './GameBoard.js';
import Pacman from './Pacman.js';
import Ghost from './Ghost.js';

//Sounds
 const soundDot = './sounds/munch.wav';
 const soundPill = './sounds/pill.wav';
 const soundGameStart = './sounds/game_start.wav';
 const soundGameOver = './sounds/gameover.wav';
 const soundDeath = './sounds/death.wav'
 const soundGhost = './sounds/eat_ghost.wav';
 const soundPause = './sounds/pause.mp3';
 const soundWin = './sounds/gamewin.wav';


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
let isComingFromPause = false;
let isPillActive = false;
let isGhostAnimationSet = false;
let isPauseSoundPlayed = false;
let time = 600;
let powerPillTime = 0;
let LEVELCopy = [];
let isShowingInstructions = false;

//Audio
function playAudio(audio) {
    const soundEffect = new Audio(audio);
    soundEffect.play();
}

const gameOver = (pacman) => {
    previousScore = score;
    isGameOver = true;
    document.removeEventListener('keydown', e => {
        pacman.handleKeyInput(e, gameBoard.objectExist);
    });

    if (!gameWin){
        livesTable[0].parentNode.removeChild(livesTable[0]);
        pacman.div.style.animation = "dead 1s linear forwards 1";
    }

    if (livesTable.length == 2){
        livesTable[0].parentNode.removeChild(livesTable[0])
        livesTable[0].classList.remove('hide')
    }

    if (gameWin == false && livesTable.length > 0){

        if (livesTable.length == 0){
            gameBoard.showGameStatus(gameWin)
            isGameStarted = false;
        } else {
            playAudio(soundDeath);
            setTimeout(() => {startGame()}, 3000)
        }
    } else {
        if (gameWin){
            playAudio(soundWin)
        } else {
            playAudio(soundGameOver)
        }
        gameBoard.showGameStatus(gameWin)
        isGameStarted = false;
    }

    timeTable.style.animation =  "";
}

const checkCollision = (pacman, ghosts) => {
    let isGhostCollided = false;

    const collidedGhost = ghosts.find((ghost) =>
        //check, that ghost and pacman overlap vertically
        (((ghost.currentTop >= pacman.currentTop) && (ghost.currentTop <= pacman.currentTop + CELL_SIZE)
        && (ghost.currentLeft >= pacman.currentLeft) && (ghost.currentLeft <= pacman.currentLeft + CELL_SIZE)
        //OR
        ||
        //check, that ghost and pacman overlap horisontally
        (ghost.currentTop + CELL_SIZE >= pacman.currentTop) && (ghost.currentTop + CELL_SIZE <= pacman.currentTop + CELL_SIZE)
        && (ghost.currentLeft + CELL_SIZE >= pacman.currentLeft) && (ghost.currentLeft + CELL_SIZE <= pacman.currentLeft + CELL_SIZE))
        //check, that ghost and pacman are in one vertical or horisontal line
        && (ghost.currentLeft == pacman.currentLeft || ghost.currentTop == pacman.currentTop))
    );

    if (collidedGhost) {
        if (pacman.powerPill && collidedGhost.isScared) {
            playAudio(soundGhost);
            collidedGhost.setToPosition(collidedGhost.startPos, true);
            collidedGhost.pos = collidedGhost.startPos;
            collidedGhost.setIsScared(false);
            score += 100;
        } else {
            gameBoard.removeObject(pacman.pos, [OBJECT_TYPE.PACMAN]);
            gameBoard.rotateDiv(pacman.pos, 0);
            isGhostCollided = true;
            gameOver(pacman, gameGrid);
        }
    }
    return isGhostCollided;
}

const gameLoop = (timestamp, pacman, ghosts = null) => {

    // Check if game over
    if (isGameOver) {
        return;
    }

    if (isGamePaused && !isPauseSoundPlayed){
        playAudio(soundPause)
        isPauseSoundPlayed = true
    }

    // Check if game is paused
    if (!isShowingInstructions){
        gameBoard.showGamePaused(isGamePaused)
    }

    // Check that all characters moving with global speed and not moving while pause
    if ((timestamp < previousTimeStamp + GLOBAL_SPEED) || isGamePaused) {
        window.requestAnimationFrame(function(timestamp) {
            gameLoop(timestamp, pacman, ghosts);
        });

        return;
    }

    isPauseSoundPlayed = false

    // Returning from a pause having eating a Power Pill

    if (isComingFromPause && powerPillTime != 0){
        pacman.powerPill = true
        clearTimeout(powerPillTimer);
        powerPillTimer = setTimeout(
            () => (pacman.powerPill = false),
            powerPillTime
        );
        // ghosts.forEach((ghost) => (ghost.setIsScared(pacman.powerPill)))
        isComingFromPause = false
    }


 
    previousTimeStamp = timestamp;

    // 1. Move Pacman
    gameBoard.movePacman(pacman);
    pacman.moveDiv();
    
    // 2. Check Ghost collision on the old positions
    if (checkCollision(pacman, ghosts)) {
        return
    };

    // 3. Move ghosts
    ghosts.forEach((ghost) => {
        gameBoard.moveGhost(ghost, pacman, ghosts);
        ghost.moveDiv();
    });

     // 4. Do a new ghost collision check on the new positions
    if (checkCollision(pacman, ghosts)){
        return
    };

    // 5. Check if Packman eats a dot
    if (gameBoard.objectExist(pacman.pos, OBJECT_TYPE.DOT)) {
        playAudio(soundDot);
        LEVELCopy[pacman.pos] = 0
        gameBoard.removeObject(pacman.pos, [OBJECT_TYPE.DOT]);
        
        gameBoard.dotCount--;
        score +=10;
    }

    // 6. Check if Packman eats a pill
    if (gameBoard.objectExist(pacman.pos, OBJECT_TYPE.PILL)) {
        playAudio(soundPill);
        LEVELCopy[pacman.pos] = 0
        gameBoard.removeObject(pacman.pos, [OBJECT_TYPE.PILL]);

        pacman.powerPill = true;
        powerPillTime = 10000;
        gameBoard.pillCount--;
        score += 50;

        clearTimeout(powerPillTimer);
        powerPillTimer = setTimeout(
            () => (pacman.powerPill = false),
            POWER_PILL_TIME
        );

        isPillActive = true;
        isGhostAnimationSet = false;

    }

    // Updating the Power Pill time if Pac-Man has eating one
    // or setting the time to 0 if he hasn't
    if (pacman.powerPill){
        powerPillTime -= 80;

        if (powerPillTime < 2000 && !isGhostAnimationSet) {
            ghosts.forEach((ghost) => {
                if (ghost.isScared) {
                    ghost.div.classList.remove(OBJECT_TYPE.SCARED);
                    ghost.div.style.animation = "scary 0.1s ease-in-out alternate infinite";
                }
            });
            isGhostAnimationSet = true;
        }
    } else {
        powerPillTime = 0
    }

    // 7. Change ghost scare mode depending on powerpill
    if (pacman.powerPill !== powerPillActive || isPillActive ) {
        powerPillActive = pacman.powerPill;
        ghosts.forEach((ghost) =>  {
            if (!pacman.powerPill) {
                isGhostAnimationSet = false;
            }

            ghost.setIsScared(pacman.powerPill)
        });
    }

    if (gameBoard.dotCount === 0 && gameBoard.pillCount === 0) {
        gameWin = true;
        gameOver(pacman, ghosts);
    }

    if (time < 0){
        gameOver(pacman, ghosts);
    }

    //Show the score
    scoreTable.innerHTML = score;

    // Update countdown time
    let newTime = Math.round(time--/10);
    timeTable.innerHTML = newTime;

    if (newTime == 10) {
        timeTable.style.animation =  "countdown 1s ease-in-out alternate infinite";
    }

    window.requestAnimationFrame(function(timestamp) {
        gameLoop(timestamp, pacman, ghosts);
    });


    isPillActive = false

}

const startGame = () => {
    playAudio(soundGameStart);
    powerPillActive = false;
    gameWin = false;
    isGameOver = false;
    time = 600;

    if (previousScore != 0){
        score = previousScore
    }

    if (isGameStarted){
        gameBoard.createGrid(LEVELCopy);
        gameBoard.createMaze(LEVELCopy);
    } else {
        if (livesTable.length != 4){
            if (livesTable.length != 0){
                gameBoard.deleteLivesTable()
            }
            gameBoard.createLivesTable()
        }
        gameBoard.createGrid(LEVEL);
        gameBoard.createMaze(LEVEL);

        gameBoard.gameWinDiv.classList.add('hide');

        score = 0;

        isGameStarted = true
    }

    const pacman = new Pacman(2, 287);
    pacman.div.style.animation = "chew 0.3s linear forwards infinite";

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
        if (isShowingInstructions){
            isShowingInstructions = false
            isGamePaused = false
            instructions[2].classList.add("hide");
        }
        
        LEVELCopy = [...LEVEL]
        instructions[0].classList.add("hide");
        instructions[1].classList.add("hide");
        startGame();
    }

    if ((e.key === 'p' || e.key === 'P') && isGameStarted && !isGamePaused && !isShowingInstructions){
        isGamePaused = true
        isComingFromPause = false
    } else if ((e.key === 'p' || e.key === 'P') && isGameStarted && isGamePaused && !isShowingInstructions){
        isGamePaused = false
        isComingFromPause = true
    }

    if ((e.key === 'i' || e.key === 'I') && !isShowingInstructions && !isGameOver && !isGamePaused){
        if (!isGameStarted){
            instructions[1].classList.add("hide");
        }
        if (!isGamePaused){
            isGamePaused = true
            isComingFromPause = false
        }
        instructions[0].classList.remove("hide");
        instructions[2].classList.remove("hide");
        isShowingInstructions = true;
    } else if ((e.key === 'i' || e.key === 'I') && isShowingInstructions && !isGameOver){
        if (!isGameStarted){
            instructions[1].classList.remove("hide")
            instructions[2].classList.add("hide");
        } else {
            instructions[2].classList.add("hide");
            instructions[0].classList.add("hide");
        }
        isGamePaused = false
        isShowingInstructions = false
        isComingFromPause = true
    }
})