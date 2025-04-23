function gridCheck(grid, i, j, target) {
  if (i >= 0 && i < grid.length && j >= 0 && j < grid[i].length) {
    return grid[i][j] === target || grid[i][j] === "$";
  }
  return false;
}

function gridCode(grid, i, j, target) {
  let code = 0;
  if (gridCheck(grid, i - 1, j, target)) code += 1;      // North
  if (gridCheck(grid, i + 1, j, target)) code += 2;      // South
  if (gridCheck(grid, i, j + 1, target)) code += 4;      // East
  if (gridCheck(grid, i, j - 1, target)) code += 8;      // West
  return code;
}

const lookup1 = [
  [0, 0], // 0000 - no neighbors
  [10, 2], // 0001 - N
  [0, 1], // 0010 - S
  [0, 1], // 0011 - NS
  [10, 2], // 0100 - E
  [9, 2], // 0101 - NE
  [9, 0], // 0110 - SE
  [9, 1], // 0111 - NSE
  [10, 2], // 1000 - W
  [11, 2], // 1001 - NW
  [11, 0], // 1010 - SW
  [11, 1], // 1011 - NSW
  [10, 2], // 1100 - EW
  [10, 2], // 1101 - NEW
  [10, 0], // 1110 - SEW
  [5, 1], // 1111 - NSEW
];

const lookup2 = [
  [1, 1], // 0000 - no neighbors
  [1, 0], // 0001 - N
  [1, 2], // 0010 - S
  [6, 0], // 0011 - NS
  [2, 1], // 0100 - E
  [6, 0], // 0101 - NE
  [7, 0], // 0110 - SE
  [6, 0], // 0111 - NSE
  [0, 1], // 1000 - W
  [6, 1], // 1001 - NW
  [7, 0], // 1010 - SW
  [6, 1], // 1011 - NSW
  [6, 0], // 1100 - EW
  [7, 0], // 1101 - NEW
  [6, 1], // 1110 - SEW
  [7, 0], // 1111 - NSEW
];

function placeTile(p, i, j, ti, tj) {
  p.image(p.tilesetImage, 16 * j, 16 * i, 16, 16, 8 * ti, 8 * tj, 8, 8);
}
