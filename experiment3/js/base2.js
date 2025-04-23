let myInstance2;
let canvasContainer2;
var centerHorz, centerVert;

function resizeScreen() {
  centerHorz = canvasContainer2.width() / 2; // Adjusted for drawing logic
  centerVert = canvasContainer2.height() / 2; // Adjusted for drawing logic
  console.log("Resizing...");
  resizeCanvas(canvasContainer2.width(), canvasContainer2.height());
  // redrawCanvas(); // Redraw everything based on new size
}

let seed2 = 0;
let tilesetImage2;
let currentGrid2 = [];
let numRows2, numCols2;

function preload() {
  tilesetImage2 = loadImage(
    "https://cdn.glitch.com/25101045-29e2-407a-894c-e0243cd8c7c6%2FtilesetP8.png?v=1611654020438"
  );
}

function reseed2() {
  seed2 = (seed2 | 0) + 1109;
  randomSeed(seed2);
  noiseSeed(seed2);
  select("#seed2Report").html("seed2 " + seed2);
  regenerateGrid();
}

function regenerateGrid() {
  select("#asciiBox").value(gridToString(generateGrid(numCols2, numRows2)));
  reparseGrid();
}

function reparseGrid() {
  currentGrid2 = stringToGrid(select("#asciiBox").value());
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

// setup() function is called once when the program starts
function setup() {
  // // place our canvas, making it fit our container
  // canvasContainer2 = $("#canvas-container");
  // let canvas = createCanvas(16 * numCols2, 16 * numRows2).parent("canvasContainer2");
  // canvas.parent("canvas-container");
  // // resize canvas is the page is resized

  // $(window).resize(function() {
  //   resizeScreen();
  // });
  // resizeScreen();

  numCols2 = select("#asciiBox").attribute("rows") | 0;
  numRows2 = select("#asciiBox").attribute("cols") | 0;

  createCanvas(16 * numCols2, 16 * numRows2).parent("canvasContainer2");
  select("canvas").elt.getContext("2d").imageSmoothingEnabled = false;

  select("#reseed2Button").mousePressed(reseed2);
  select("#asciiBox2").input(reparseGrid);

  reseed2();
}

function draw() {
  randomSeed(seed2);
  drawGrid(currentGrid2, p);
}

function placeTile(i, j, ti, tj, p) {
  p.image(tilesetImage2, 16 * j, 16 * i, 16, 16, 8 * ti, 8 * tj, 8, 8);
}