// Globals
let myInstance;
let canvasContainer;
var centerHorz, centerVert;
let i = 0;
let stars = [];
let starCount = 500;
let spinFactor = 0.0009;
let randX;
let randY;

const stoneColor = "black";

function resizeScreen() {
  centerHorz = canvasContainer.width() / 2; // Adjusted for drawing logic
  centerVert = canvasContainer.height() / 2; // Adjusted for drawing logic
  console.log("Resizing...");
  resizeCanvas(canvasContainer.width(), canvasContainer.height());
  // redrawCanvas(); // Redraw everything based on new size
}

// setup() function is called once when the program starts
function setup() {
  // place our canvas, making it fit our container
  canvasContainer = $("#canvas-container");
  let canvas = createCanvas(canvasContainer.width(), canvasContainer.height());
  canvas.parent("canvas-container");
  // resize canvas is the page is resized


  $(window).resize(function() {
    resizeScreen();
    drawBackground();
    drawBackground();
    drawBackground();
    drawBackground();
    drawBackground();
  });
  resizeScreen();

  c1 = color(0, 0, random(50, 100));
  c2 = color(20, 20, random(150, 255));
  
  randX = random() * width;
  randY = random() * height;
  //seed = random();
  
  for (let j = 0; j < starCount; j++) {
    stars.push(new Star(random() * width * random([-1, 1]), random() * height * random([-1, 1]), random(0.5, 2), random(200, 255), random(200, 255), random(200, 255)));
    
    print(starCount.length)
  }

  drawBackground();
}

function draw() {
  //drawBackground()
  if (i % 2800 == 0) {
    drawBackground();
    drawBackground();
    drawBackground();
    drawBackground();
  }
  
  i++;
  //print(i)
  
  //stars[1].turn();
  for (let obj of stars) {
    obj.turn();
  }
  
  drawMountain();
}

function drawBackground() {
  for(let y=0; y<height; y++){
    n = map(y,0,height,0,1);
    let newc = lerpColor(c1,c2,n);
    stroke(newc);
    line(0,y,width, y);
  }
}

function drawMountain() {
  randomSeed(randX);
  
  fill(stoneColor);
  stroke(stoneColor);
  beginShape();
  vertex(0, height);
  const steps = 100;
  for (let i = 0; i < steps + 1; i++) {
    let x = (width * i) / steps;
    //print(noise(x) * noise(x) * noise(x) * height + 200);
    //print((noise(x) * sin(x) * sin(x) * 50) + height/1.2);
    //print((sin(x) * cos(x) / noise(x) * 20) + height/1.2);
    let y = height - (sin(x * 0.01) * cos(x * 0.009)) * 100 - noise(x * 0.01) * floor(height/3);
    vertex(x, y);
  }
  vertex(width, height);
  endShape(CLOSE);
}

class Star {
  constructor(x, y, size, r, g, b) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.r = r;
    this.g = g;
    this.b = b;
  }
  turn() {
    push();
    
    translate(randX, randY);
    rotate(i*spinFactor)
    fill(this.r, this.g, this.b);
    stroke(this.r, this.g, this.b);
    circle(this.x, this.y, this.size);
    
    pop();
  }
}

