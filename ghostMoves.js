import {OBJECT_TYPE, DIRECTIONS, GRID_SIZE, GRID_LENGHT, LEFT_TUNNEL, RIGHT_TUNNEL} from './setup.js';

export function blinky(position, direction, objectExist, pacman, ghosts) {

    let key = "ArrowUp",
        nextMovePos,
        nextDirection,
        line = 0;

    if (objectExist(position, OBJECT_TYPE.GHOSTLAIR)) {
        nextMovePos = position +  DIRECTIONS[key].movement;
    } else if (position == LEFT_TUNNEL && direction == DIRECTIONS.ArrowLeft) {
        nextMovePos = RIGHT_TUNNEL;
        nextDirection = direction;
    } else if (position == RIGHT_TUNNEL && direction == DIRECTIONS.ArrowRight) {
        nextMovePos = LEFT_TUNNEL;
        nextDirection = direction;   
    } else {
        let pacmanColumn  = pacman.pos % GRID_SIZE;
        let pacmanRow = Math.floor(pacman.pos / GRID_SIZE);

        let directions = [];
        if (direction.code !== DIRECTIONS.ArrowRight.code) {
            directions.push("ArrowLeft");
        }
        if (direction.code !== DIRECTIONS.ArrowLeft.code) {
            directions.push("ArrowRight");
        }
        if (direction.code !== DIRECTIONS.ArrowUp.code) {
            directions.push("ArrowDown");
        }
        if (direction.code !== DIRECTIONS.ArrowDown.code) {
            directions.push("ArrowUp");
        }

         directions.forEach(dir => {
            let dirNextMovePos = position +  DIRECTIONS[dir].movement;

            if (dirNextMovePos < 0) {
                dirNextMovePos = 0;
            }

            if (dirNextMovePos >= GRID_SIZE * GRID_LENGHT) {
                dirNextMovePos = GRID_SIZE * GRID_LENGHT -1;
            }

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

    
    if (nextMovePos == undefined) {
        debugger;
    }

    nextDirection = DIRECTIONS[key];

    return {nextMovePos, direction : nextDirection};
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
        if (newPos >= 0 && newPos < GRID_SIZE * GRID_LENGHT) {
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
        if (newPos >= 0 && newPos < GRID_SIZE * GRID_LENGHT) {
            pacmanAhead.pos = newPos;
        }
        if (direction.code === 40) {
            pacmanAhead.pos = newPos + 1;
        }
    }

    return blinky(position, direction, objectExist, pacmanAhead, ghosts)
}

export function scared(position, direction, objectExist, targetPosition) {

    let target = {pos : targetPosition}
    return blinky(position, direction, objectExist, target, []);
}