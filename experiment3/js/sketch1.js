const sketch1 = (p) => {
  let seed = 0;
  let currentGrid = [];
  let numCols
  let numRows
  p.tilesetImage;

  p.preload = () => {
    p.tilesetImage = p.loadImage(
      "https://cdn.glitch.com/25101045-29e2-407a-894c-e0243cd8c7c6%2FtilesetP8.png?v=1611654020438"
    );
  };

  function reseed() {
    seed = (seed | 0) + 1109;
    p.randomSeed(seed);
    p.noiseSeed(seed);
    p.select("#seedReport1").html("seed " + seed);
    regenerateGrid();
  }

  function reparseGrid() {
    currentGrid = stringToGrid(p.select("#asciiBox1").value());
  }

  function regenerateGrid() {
    p.select("#asciiBox1").value(gridToString(generateGrid(numCols, numRows)));
    reparseGrid();
  }

  function gridToString(grid) {
    let rows = [];
    for (let i = 0; i < grid.length; i++) {
      rows.push(grid[i].join(""));
    }
    return rows.join("\n");
  }

  function stringToGrid(str) {
    let grid = [];
    let lines = str.split("\n");
    for (let i = 0; i < lines.length; i++) {
      let row = [];
      let chars = lines[i].split("");
      for (let j = 0; j < chars.length; j++) {
        row.push(chars[j]);
      }
      grid.push(row);
    }
    return grid;
  }

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
      let roomWidth = p.floor(p.random(4, 6));
      let roomHeight = p.floor(p.random(4, 6));
      let x = p.floor(p.random(1, numCols - roomWidth - 1));
      let y = p.floor(p.random(1, numRows - roomHeight - 1));
  
      for (let i = y; i < y + roomHeight; i++) {
        for (let j = x; j < x + roomWidth; j++) {
          grid[i][j] = "!";
        }
      }
  
      roomCenters.push({ x: x + p.floor(roomWidth / 2), y: y + p.floor(roomHeight / 2) });
    }
  
    for (let i = 0; i < roomCenters.length - 1; i++) {
      let a = roomCenters[i];
      let b = roomCenters[i + 1];
  
      if (p.random() < 0.5) {
        for (let x = p.min(a.x, b.x); x <= p.max(a.x, b.x); x++) {
          if (!gridCheck(grid, a.y, x, "!")) {
            grid[a.y][x] = "@";
          }
        }
        
        for (let y = p.min(a.y, b.y); y <= p.max(a.y, b.y); y++) {
          if (!gridCheck(grid, y, b.x, "!")) {
            grid[y][b.x] = "@";
          }
        }
      } else {
        for (let y = p.min(a.y, b.y); y <= p.max(a.y, b.y); y++) {
          if (!gridCheck(grid, y, a.x, "!")) {
            grid[y][a.x] = "@";
          }
        }
        
        for (let x = p.min(a.x, b.x); x <= p.max(a.x, b.x); x++) {
          if (!gridCheck(grid, b.y, x, "!")) {
            grid[b.y][x] = "@";
          }
        }
      }
    }
    
    
    for (let i = 0; i < numRows; i++) {
      for (let j = 0; j < numCols; j++) {
        if (gridCheck(grid, i, j, "!") && gridCode(grid, i, j, "!") == 15 && p.random() < 0.05) {
          grid[i][j] = "$"
        }
      }
    }
    
    
    return grid;
  }

  function drawContext(grid, i, j, target, ti, tj) {
    const code = gridCode(grid, i, j, target);
    const offsets = lookup1[code]
    if (offsets) {
      const [tiOffset, tjOffset] = lookup1[code]; 
      placeTile(p, i, j, ti + tiOffset, tj + tjOffset);
    }
  }

  function drawGrid(grid) {
  
    p.background(128);
  
    for(let i = 0; i < grid.length; i++) {
      for(let j = 0; j < grid[i].length; j++) {
        if (grid[i][j] == '_') {
          if (p.noise(i * 0.1, j * 0.1, p.millis() * 0.0001) > 0.55) {
            placeTile(p, i, j, p.floor(p.random(1, 4)), 9);
          } else {
            placeTile(p, i, j, 0, 9);
          }
        }
  
        else if (grid[i][j] == '@') {
          placeTile(p, i, j, 11, 21);
        }
  
        else if (grid[i][j] == '!') {
          placeTile(p, i, j, 0, 10);
          drawContext(grid, i, j, "!", 0, 9);
        }
        else if (grid[i][j] == '$') {
          placeTile(p, i, j, 0, 10);
          placeTile(p, i, j, 0, 28)
        }
      }
    }
  }

  p.setup = () => {
    numCols = p.select("#asciiBox1").attribute("rows") | 0;
    numRows = p.select("#asciiBox1").attribute("cols") | 0;

    p.createCanvas(16 * numCols, 16 * numRows).parent("canvasContainer1");
    p.select("canvas").elt.getContext("2d").imageSmoothingEnabled = false;

    p.select("#reseedButton1").mousePressed(reseed);
    p.select("#asciiBox1").input(reparseGrid);

    reseed();
  };

  p.draw = () => {
    p.randomSeed(seed);
    drawGrid(currentGrid);
  };
};

new p5(sketch1);
