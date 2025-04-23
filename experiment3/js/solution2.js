/* exported generateGrid, drawGrid */
/* global placeTile */

function sketch2(p) {
  let grid;

  p.setup = function () {
    const container = document.getElementById("canvasContainer2");
    p.createCanvas(256, 256).parent(container); // fixes the 'null' error
    grid = generateGrid(20, 20, p); // adjust to your generator
  };

  p.draw = function () {
    p.background(128);
    drawGrid(grid, p); // assuming this uses `p` for drawing
  };
}

new p5(sketch2, document.getElementById("canvasContainer2"));


function generateGrid(numCols, numRows, p) {
  let grid = [];
  for (let i = 0; i < numRows; i++) {
    let row = [];
    for (let j = 0; j < numCols; j++) {
      row.push("_");
    }
    grid.push(row);
  }
  
  let preRandom = p.random([0, 1])
  
  let pathLeftEdge = 9 - preRandom
  let pathRightEdge = 10 + preRandom
  
  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      if (j >= pathLeftEdge && j <= pathRightEdge) {
        grid[i][j] = "."
      }
      else if (j >= pathLeftEdge - 2 && j <= pathRightEdge + 2) {
        if (p.random() < 0.5) {
          grid[i][j] = "."
        }
      }
      else if ((j > 3 && j < pathLeftEdge) || (j > pathRightEdge && j < numCols-3)) {
        if (p.random() < 0.02) {
          grid[i][j] = "^"
        }
      }
      else if ((j <= 3) || (j >= numCols-3)) {
        if (p.noise(i/5,j/5) > 0.45) {
          grid[i][j] = "#"
        }
      }
    }
  }
  
  return grid;
}

function drawGrid(grid, p) {
  
  p.background(128);

  for(let i = 0; i < grid.length; i++) {
    for(let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] == ".") {
        if (p.noise(i * 0.1, j * 0.1, p.millis() * 0.001) > 0.55) {
          placeTile(i, j, p.random([1, 2, 3]), p.random([18, 19]));
        } else {
          placeTile(i, j, 0, 18);
        }
      }
      if (grid[i][j] == "_") {
        placeTile(i, j, p.random([0, 3]), 3);
        drawContext(grid, i, j, ".", 4, 18)
      }
      else if (grid[i][j] == "^") {
        placeTile(i, j, p.random([0, 3]), 3);
        placeTile(i, j, 26, 1);
      }
      else if (grid[i][j] == "#") {
        placeTile(i, j, p.random([0, 3]), 3);
        placeTile(i, j, 14, 3);
      }
    }
  }
}

function gridCheck(grid, i, j, target) {
  if (i >= 0 && i < grid.length && j >= 0 && j < grid[i].length) {
    if (grid[i][j] == target || grid[i][j] == "$") {
      return true
    }
    else {
      return false
    }
  }
}

function gridCode(grid, i, j, target) {
  let code = 0
  if (gridCheck(grid, i-1, j, target)) code += 1; //north
  if (gridCheck(grid, i+1, j, target)) code += 1<<1; //south
  if (gridCheck(grid, i, j+1, target)) code += 1<<2; //east
  if (gridCheck(grid, i, j-1, target)) code += 1<<3; //west
  return code
}

function drawContext(grid, i, j, target, ti, tj) {
  const code = gridCode(grid, i, j, target);
  const offsets = lookup2[code]
  if (offsets) {
    const [tiOffset, tjOffset] = lookup2[code];
    if (code != 0) {
      placeTile(i, j, ti + tiOffset, tj + tjOffset);
    }
  }
  
}

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




