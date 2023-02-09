import {OBJECT_TYPE, DIRECTIONS, GRID_SIZE} from './setup.js';

export function blinky(position, direction, objectExist, pacman, ghosts) {

    let key = "",
        nextMovePos = undefined,
        line = 0;

    if (objectExist(position, OBJECT_TYPE.GHOSTLAIR)) {
        key = "ArrowUp";
        nextMovePos = position +  DIRECTIONS[key].movement;
    } else {
        let pacmanColumn  = pacman.pos % GRID_SIZE;
        let pacmanRow = Math.floor(pacman.pos / GRID_SIZE);

        let directions = ["ArrowDown", "ArrowUp", "ArrowRight"];
        if (direction.code !== 39) {
            directions.push("ArrowLeft");
        }

         directions.forEach(dir => {
            let dirNextMovePos = position +  DIRECTIONS[dir].movement;

            let isAnotherGhostPos = false;
            //todo other ghost position check
      
            if ((!(objectExist(dirNextMovePos, OBJECT_TYPE.WALL) || objectExist(dirNextMovePos, OBJECT_TYPE.GHOSTLAIR)))&& (!isAnotherGhostPos)) {
                let ghostColumn = dirNextMovePos % GRID_SIZE;
                let ghostRow = Math.floor(dirNextMovePos / GRID_SIZE);
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

export function pinky(position, direction, objectExist, pacman, ghosts) {

    let pacmanAhead = JSON.parse(JSON.stringify(pacman));

    //todo range check
    if (pacman.dir !== null) {
        let newPos = pacmanAhead.pos + 4 * (pacman.dir.movement);
        if (newPos < GRID_SIZE * GRID_SIZE) {
            pacmanAhead.pos = newPos;
        }
        if (direction.code === 40) {
            pacmanAhead.pos = newPos - 1;
        }
    }

    return blinky(position, direction, objectExist, pacmanAhead, ghosts)
}

export function inky(position, direction, objectExist, pacman, ghosts) {
    //temporary logic
    let pacmanAhead = JSON.parse(JSON.stringify(pacman));

    //todo range check
    if (pacman.dir !== null) {
        let newPos = pacmanAhead.pos + 2;
        if (newPos > 0 && newPos < GRID_SIZE * GRID_SIZE) {
            pacmanAhead.pos = newPos;
        }
        if (direction.code === 40) {
            pacmanAhead.pos = newPos - 1;
        }
    }

    return blinky(position, direction, objectExist, pacmanAhead, ghosts)
}

export function clyde(position, direction, objectExist, pacman, ghosts) {
    //temporary logic
    let pacmanAhead = JSON.parse(JSON.stringify(pacman));

    //todo range check
    if (pacman.dir !== null) {
        let newPos = pacmanAhead.pos - 4 * (pacman.dir.movement);
        if (newPos > 0 && newPos < GRID_SIZE * GRID_SIZE) {
            pacmanAhead.pos = newPos;
        }
        if (direction.code === 40) {
            pacmanAhead.pos = newPos + 1;
        }
    }

    return blinky(position, direction, objectExist, pacmanAhead, ghosts)
}

export function scared(position, direction, objectExist, pacman) {

}