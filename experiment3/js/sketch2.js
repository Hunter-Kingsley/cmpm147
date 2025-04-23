const sketch2 = (p) => {
  let seed = 0;
  let currentGrid = [];
  let numCols;
  let numRows;
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
    p.select("#seedReport2").html("seed " + seed);
    regenerateGrid();
  }

  function reparseGrid() {
    currentGrid = stringToGrid(p.select("#asciiBox2").value());
  }

  function regenerateGrid() {
    p.select("#asciiBox2").value(gridToString(generateGrid(numCols, numRows)));
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

  function generateGrid() {
    let grid = Array.from({ length: numRows }, () => Array(numCols).fill("_"));

    let preRandom = p.random([0, 1]);
    let pathLeftEdge = 9 - preRandom;
    let pathRightEdge = 10 + preRandom;

    for (let i = 0; i < numRows; i++) {
      for (let j = 0; j < numCols; j++) {
        if (j >= pathLeftEdge && j <= pathRightEdge) {
          grid[i][j] = ".";
        } else if (j >= pathLeftEdge - 2 && j <= pathRightEdge + 2) {
          if (p.random() < 0.5) {
            grid[i][j] = ".";
          }
        } else if ((j > 3 && j < pathLeftEdge) || (j > pathRightEdge && j < numCols - 3)) {
          if (p.random() < 0.02) {
            grid[i][j] = "^";
          }
        } else if ((j <= 3) || (j >= numCols - 3)) {
          if (p.noise(i / 5, j / 5) > 0.45) {
            grid[i][j] = "#";
          }
        }
      }
    }

    return grid;
  }

  function drawGrid(grid) {
    p.background(128);

    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        if (grid[i][j] === ".") {
          if (p.noise(i * 0.1, j * 0.1, p.millis() * 0.001) > 0.55) {
            placeTile(p, i, j, p.random([1, 2, 3]), p.random([18, 19]));
          } else {
            placeTile(p, i, j, 0, 18);
          }
        } else if (grid[i][j] === "_") {
          placeTile(p, i, j, p.random([0, 3]), 3);
          drawContext(grid, i, j, ".", 4, 18);
        } else if (grid[i][j] === "^") {
          placeTile(p, i, j, p.random([0, 3]), 3);
          placeTile(p, i, j, 26, 1);
        } else if (grid[i][j] === "#") {
          placeTile(p, i, j, p.random([0, 3]), 3);
          placeTile(p, i, j, 14, 3);
        }
      }
    }
  }

  function drawContext(grid, i, j, target, ti, tj) {
    const code = gridCode(grid, i, j, target);
    const offsets = lookup2[code]
    if (offsets) {
      const [tiOffset, tjOffset] = lookup2[code];
      if (code != 0) {
        placeTile(p, i, j, ti + tiOffset, tj + tjOffset);
      }
    }
  }

  p.setup = () => {
    numCols = p.select("#asciiBox2").attribute("cols") | 0;
    numRows = p.select("#asciiBox2").attribute("rows") | 0;

    p.createCanvas(16 * numCols, 16 * numRows).parent("canvasContainer2");
    p.select("canvas").elt.getContext("2d").imageSmoothingEnabled = false;

    p.select("#reseedButton2").mousePressed(reseed);
    p.select("#asciiBox2").input(reparseGrid);

    reseed();
  };

  p.draw = () => {
    p.randomSeed(seed);
    drawGrid(currentGrid);
  };
};

new p5(sketch2);
