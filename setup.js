export const GRID_SIZE = 20;
export const GRID_LENGHT = 23;
export const CELL_SIZE = 40;

export const DIRECTIONS = {
  ArrowLeft: {
    code: 37,
    movement: -1,
    rotation: 180
  },
  ArrowUp: {
    code: 38,
    movement: -GRID_SIZE,
    rotation: 270
  },
  ArrowRight: {
    code: 39,
    movement: 1,
    rotation: 0
  },
  ArrowDown: {
    code: 40,
    movement: GRID_SIZE,
    rotation: 90
  }
};

export const OBJECT_TYPE = {
  BLANK: 'blank',
  WALL: 'wall',
  DOT: 'dot',
  BLINKY: 'blinky',
  PINKY: 'pinky',
  INKY: 'inky',
  CLYDE: 'clyde',
  PILL: 'pill',
  PACMAN: 'pacman',
  GHOST: 'ghost',
  SCARED: 'scared',
  GHOSTLAIR: 'lair',
  WALL_TOP_RIGHT_CORNER: 'top_right_corner',
  WALL_TOP_LEFT_CORNER: 'top_left_corner',
  WALL_HORIZONTAL: 'horizontal',
  WALL_VERTICAL: 'vertical',
  WALL_BOTTOM_LEFT_CORNER: 'bottom_left_corner',
  WALL_HORIZONTAL_BOTTOM: 'horizontal_bottom',
  WALL_BOTTOM_RIGHT_CORNER: 'bottom_right_corner',
  WALL_RIGHT_END: 'right_end',
  WALL_LEFT_END: 'left_end',
  WALL_TOP_END: 'top_end',
  WALL_BOTTOM_END: 'bottom_end',
  WALL_DOUBLE_LEFT: 'double_left',
  WALL_DOUBLE_RIGHT: 'double_right',
  WALL_DOUBLE_TOP: '',
  WALL_DOUBLE_BOTTOM: '',
  WALL_GHOSTLAIR: 'wall_ghostlair'
};

// Lookup array for classes
export const CLASS_LIST = [
  OBJECT_TYPE.BLANK, // 0
  OBJECT_TYPE.WALL, // 1
  OBJECT_TYPE.DOT, // 2
  OBJECT_TYPE.BLINKY, // 3
  OBJECT_TYPE.PINKY, // 4
  OBJECT_TYPE.INKY, // 5
  OBJECT_TYPE.CLYDE, // 6
  OBJECT_TYPE.PILL, // 7
  OBJECT_TYPE.PACMAN, // 8
  OBJECT_TYPE.GHOSTLAIR, // 9
  OBJECT_TYPE.WALL_HORIZONTAL, // 10
  OBJECT_TYPE.WALL_VERTICAL, // 11
  OBJECT_TYPE.WALL_TOP_RIGHT_CORNER, // 12
  OBJECT_TYPE.WALL_TOP_LEFT_CORNER, // 13
  OBJECT_TYPE.WALL_BOTTOM_LEFT_CORNER, // 14
  OBJECT_TYPE.WALL_BOTTOM_RIGHT_CORNER, // 15
  OBJECT_TYPE.WALL_RIGHT_END, // 16
  OBJECT_TYPE.WALL_LEFT_END, // 17
  OBJECT_TYPE.WALL_TOP_END, // 18
  OBJECT_TYPE.WALL_BOTTOM_END, // 19
  OBJECT_TYPE.WALL_DOUBLE_LEFT, // 20
  OBJECT_TYPE.WALL_DOUBLE_RIGHT, // 21
  OBJECT_TYPE.WALL_DOUBLE_TOP, // 22
  OBJECT_TYPE.WALL_DOUBLE_BOTTOM, // 23
  OBJECT_TYPE.WALL_GHOSTLAIR, // 24
];

// prettier-ignore
export const LEVEL = [
  12, 10, 10, 10, 10, 10, 10, 10, 10, 13, 12, 10, 10, 10, 10, 10, 10, 10, 10, 13,
  11, 2, 2, 2, 2, 2, 2, 2, 2, 11, 11, 2, 2, 2, 2, 2, 2, 2, 2, 11,
  11, 2, 12, 13, 2, 12, 10, 13, 2, 11, 11, 2, 12, 10, 13, 2, 12, 13, 2, 11,
  11, 7, 14, 15, 2, 14, 10, 15, 2, 14, 15, 2, 14, 10, 15, 2, 14, 15, 7, 11,
  11, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 11,
  11, 2, 16, 17, 2, 18, 2, 16, 10, 13, 12, 10, 17, 2, 18, 2, 16, 17, 2, 11,
  11, 2, 2, 2, 2, 11, 2, 2, 2, 11, 11, 2, 2, 2, 11, 2, 2, 2, 2, 11,
  14, 10, 10, 13, 2, 21, 10, 17, 2, 14, 15, 2, 16, 10, 20, 2, 12, 10, 10, 15,
  0, 0, 0, 11, 2, 11, 2, 2, 2, 2, 2, 2, 2, 2, 11, 2, 11, 0, 0, 0,
  0, 0, 0, 11, 2, 11, 2, 18, 24, 24, 24, 24, 18, 2, 11, 2, 11, 0, 0, 0,
  16, 10, 10, 15, 2, 19, 2, 11, 9, 9, 9, 9, 11, 2, 19, 2, 14, 10, 10, 17, 
  2, 2, 2, 2, 2, 2, 2, 11, 9, 9, 9, 9, 11, 2, 2, 2, 2, 2, 2, 2, 
  16, 10, 10, 13, 2, 18, 2, 11, 9, 9, 9, 9, 11, 2, 18, 2, 12, 10, 10, 17, 
  0, 0, 0, 11, 2, 11, 2, 14, 10, 10, 10, 10, 15, 2, 11, 2, 11, 0, 0, 0,
  0, 0, 0, 11, 2, 11, 2, 0, 0, 0, 0, 0, 0, 2, 11, 2, 11, 0, 0, 0,
  12, 10, 10, 15, 2, 21, 10, 17, 2, 12, 13, 2, 16, 10, 20, 2, 14, 10, 10, 13,
  11, 2, 2, 2, 2, 11, 2, 2, 2, 11, 11, 2, 2, 2, 11, 2, 2, 2, 2, 11,
  11, 2, 16, 17, 2, 19, 2, 16, 10, 15, 14, 10, 17, 2, 19, 2, 16, 17, 2, 11,
  11, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 11,
  11, 7, 12, 13, 2, 12, 10, 13, 2, 12, 13, 2, 12, 10, 13, 2, 12, 13, 7, 11,
  11, 2, 14, 15, 2, 14, 10, 15, 2, 11, 11, 2, 14, 10, 15, 2, 14, 15, 2, 11,
  11, 2, 2, 2, 2, 2, 2, 2, 2, 11, 11, 2, 2, 2, 2, 2, 2, 2, 2, 11,
  14, 10, 10, 10, 10, 10, 10, 10, 10, 15, 14, 10, 10, 10, 10, 10, 10, 10, 10, 15,
];

export const RIGHT_TUNNEL = 239;
export const LEFT_TUNNEL= 220;