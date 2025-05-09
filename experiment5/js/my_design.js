/* exported getInspirations, initDesign, renderDesign, mutateDesign */

function getInspirations() {
  return [
    {
      name: "Factorio Game Logo",
      assetUrl: "https://cdn.glitch.global/59dfb4ae-c365-45e9-9d18-389621e5d4d8/Factorio-logo.jpg?v=1746578286451",
      credit: "Factorio, 2016",
    },
    {
      name: "Four Star Dragon Ball",
      assetUrl:
        "https://cdn.glitch.global/59dfb4ae-c365-45e9-9d18-389621e5d4d8/%5BCITYPNG.COM%5DHD%20PNG%20Dragon%20Ball%20Z%20DBZ%20Crystal%20Ball%204%20Stars%20-%202000x2000.png?v=1746741251562",
      credit:
        "From CityPNG: https://www.citypng.com/photo/27988/hd-png-dragon-ball-z-dbz-crystal-ball-4-stars",
    },
    {
      name: "Goku",
      assetUrl:
        "https://cdn.glitch.global/59dfb4ae-c365-45e9-9d18-389621e5d4d8/Goku_(Super_Saiyan)_Artwork.jpg?v=1746578270304",
      credit: "Dragon Ball FighterZ, 2018",
    },
    {
      name: "Kirby",
      assetUrl:
        "https://cdn.glitch.global/59dfb4ae-c365-45e9-9d18-389621e5d4d8/Kirby_Nintendo.jpg?v=1746578266623",
      credit:
        "Sourced from Wikipedia, image originally from Kirby Super Star Ultra, 2008",
    },
  ];
}

function initDesign(inspiration) {
  inspiration.image.loadPixels();
  if (inspiration.name != "Kirby") {
    if (inspiration.name != "Four Star Dragon Ball") {
      resizeCanvas(inspiration.image.width / 4, inspiration.image.height / 4);
    }
    else {
      resizeCanvas(inspiration.image.width / 8, inspiration.image.height / 8);
    }
  }
  else {
    resizeCanvas(inspiration.image.width, inspiration.image.height);
  }

  let design = {
    bg: 128,
    fg: [],
  };

  for (let i = 0; i < 500; i++) {
    let imgX = floor(random(inspiration.image.width));
    let imgY = floor(random(inspiration.image.height));
    let idx = 4 * (imgY * inspiration.image.width + imgX);
    let pixels = inspiration.image.pixels;
    
    design.fg.push({
      x: random(width),
      y: random(height),
      w: random(width / 2),
      h: random(height / 2),
      color: [pixels[idx], pixels[idx + 1], pixels[idx + 2]],
    });
  }
  return design;
}

function renderDesign(design, inspiration) {
  background(design.bg);
  noStroke();
  for (let box of design.fg) {
    let imgX = floor(map(box.x, 0, width, 0, inspiration.image.width));
    let imgY = floor(map(box.y, 0, height, 0, inspiration.image.height));
    let idx = 4 * (imgY * inspiration.image.width + imgX);
    let pixels = inspiration.image.pixels;
    let r = pixels[idx];
    let g = pixels[idx + 1];
    let b = pixels[idx + 2];
    fill(r, g, b, 128);
    if (inspiration.name == "Kirby" || inspiration.name == "Four Star Dragon Ball") {
      ellipse(box.x, box.y, box.w, box.h);
    }
    else{
      rect(box.x, box.y, box.w, box.h);
    }
  }
}

function mutateDesign(design, inspiration, rate) {
  design.bg = mut(design.bg, 0, 255, rate);
  for (let box of design.fg) {
    box.color[0] = mut(box.color[0], 0, 255, rate);
    box.color[1] = mut(box.color[1], 0, 255, rate);
    box.color[2] = mut(box.color[2], 0, 255, rate);
    box.x = mut(box.x, 0, width, rate);
    box.y = mut(box.y, 0, height, rate);
    box.w = mut(box.w, 0, width / 2, rate);
    box.h = mut(box.h, 0, height / 2, rate);
  }
}

function mut(num, min, max, rate) {
  return constrain(randomGaussian(num, (rate * (max - min)) / 10), min, max);
}
