/* exported generateGrid, drawGrid */
/* global placeTile */

function generateGrid(numCols, numRows) {
  let grid = [];
  for (let i = 0; i < numRows; i++) {
    let row = [];
    for (let j = 0; j < numCols; j++) {
      row.push("_");
    }
    grid.push(row);
  }

  let rooms = 4;

  let roomCenters = [];

  for (let r = 0; r < rooms; r++) {
    let roomWidth = floor(random(4, 6));
    let roomHeight = floor(random(4, 6));
    let x = floor(random(1, numCols - roomWidth - 1));
    let y = floor(random(1, numRows - roomHeight - 1));

    for (let i = y; i < y + roomHeight; i++) {
      for (let j = x; j < x + roomWidth; j++) {
        grid[i][j] = "!";
      }
    }

    roomCenters.push({ x: x + floor(roomWidth / 2), y: y + floor(roomHeight / 2) });
  }

  for (let i = 0; i < roomCenters.length - 1; i++) {
    let a = roomCenters[i];
    let b = roomCenters[i + 1];

    if (random() < 0.5) {
      for (let x = min(a.x, b.x); x <= max(a.x, b.x); x++) {
        if (!gridCheck(grid, a.y, x, "!")) {
          grid[a.y][x] = "@";
        }
      }
      
      for (let y = min(a.y, b.y); y <= max(a.y, b.y); y++) {
        if (!gridCheck(grid, y, b.x, "!")) {
          grid[y][b.x] = "@";
        }
      }
    } else {
      for (let y = min(a.y, b.y); y <= max(a.y, b.y); y++) {
        if (!gridCheck(grid, y, a.x, "!")) {
          grid[y][a.x] = "@";
        }
      }
      
      for (let x = min(a.x, b.x); x <= max(a.x, b.x); x++) {
        if (!gridCheck(grid, b.y, x, "!")) {
          grid[b.y][x] = "@";
        }
      }
    }
  }
  
  
  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      if (gridCheck(grid, i, j, "!") && gridCode(grid, i, j, "!") == 15 && random() < 0.05) {
        grid[i][j] = "$"
      }
    }
  }
  
  
  return grid;
}

function drawGrid(grid) {
  
  background(128);

  for(let i = 0; i < grid.length; i++) {
    for(let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] == '_') {
        if (noise(i * 0.1, j * 0.1, millis() * 0.0001) > 0.55) {
          placeTile(i, j, floor(random(1, 4)), 9);
        } else {
          placeTile(i, j, 0, 9);
        }
      }

      else if (grid[i][j] == '@') {
        placeTile(i, j, 11, 21);
      }

      else if (grid[i][j] == '!') {
        placeTile(i, j, 0, 10);
        drawContext(grid, i, j, "!", 0, 9);
      }
      else if (grid[i][j] == '$') {
        placeTile(i, j, 0, 10);
        placeTile(i, j, 0, 28)
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
  const offsets = lookup[code]
  if (offsets) {
    const [tiOffset, tjOffset] = lookup[code]; 
    placeTile(i, j, ti + tiOffset, tj + tjOffset);
  }
  
}

const lookup = [
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




