import {OBJECT_TYPE, DIRECTIONS} from './setup.js';

export function randomMovement(postion, direction, objectExist) {
    let dir = direction;
    let nextMovePos = postion + dir.movement;
    const keys = Object.keys(DIRECTIONS);
    while (
        objectExist(nextMovePos, OBJECT_TYPE.WALL) ||
        objectExist(nextMovePos, OBJECT_TYPE.GHOST)) {
            const key = keys[Math.floor(Math.random() * keys.length)];
            dir = DIRECTIONS[key];
            nextMovePos = postion + dir.movement;
    }

     return {nextMovePos, direction : dir};
}