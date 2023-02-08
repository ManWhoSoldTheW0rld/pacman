import {OBJECT_TYPE, DIRECTIONS} from './setup.js';

export function randomMovement(postion, direction, objectExist) {
    let dir = direction;
    let nextMovePos = postion + dir.movement;
    const keys = Object.keys(DIRECTIONS);
    while (
        objectExist(nextMovePos, OBJECT_TYPE.WALL) ||
        //todo add this thacking
        objectExist(nextMovePos, OBJECT_TYPE.GHOST)) {
            const key = keys[Math.floor(Math.random() * keys.length)];
            dir = DIRECTIONS[key];
            nextMovePos = postion + dir.movement;
    }

     return {nextMovePos, direction : dir};
}

export function blinky(position, direction, objectExist, pacman) {

    let key = "",
        nextMovePos = undefined,
        line = 0;

    if (objectExist(position, OBJECT_TYPE.GHOSTLAIR)) {
        key = "ArrowUp";
        nextMovePos = position +  DIRECTIONS[key].movement;
    } else {
        let pacmanColumn  = pacman.pos % 20;
        let pacmanRow = Math.floor(pacman.pos / 20);
    
        ["ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"].forEach(dir => {
            let dirNextMovePos = position +  DIRECTIONS[dir].movement;
    
            if (!(objectExist(dirNextMovePos, OBJECT_TYPE.WALL) || objectExist(dirNextMovePos, OBJECT_TYPE.GHOSTLAIR))) {  
                let ghostColumn = dirNextMovePos % 20;
                let ghostRow = Math.floor(dirNextMovePos / 20);
                let dirLine = Math.sqrt(Math.pow(Math.abs(ghostColumn - pacmanColumn),2) + Math.pow(Math.abs(ghostRow - pacmanRow),2));
    
                if (line == 0 || dirLine < line) {
                    nextMovePos = dirNextMovePos;
                    line = dirLine;
                    key = dir;
                }
            }
        });
    }

    return {nextMovePos, direction : DIRECTIONS[key]};
}

export function pinky(position, direction, objectExist, pacman) {

    let pacmanAhead = JSON.parse(JSON.stringify(pacman));

    //todo range check
    if (pacman.dir !== null) {
        let newPos = 3 * (pacman.dir.movement);
        if (newPos < 20* 20) {
            pacmanAhead.pos = 3 * (pacman.dir.movement);
        }
    }

    return blinky(position, direction, objectExist, pacmanAhead)
}