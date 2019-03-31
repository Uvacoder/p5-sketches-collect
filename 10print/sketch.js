
/** Indices, column and row count and width and height */
let i = 0;
let cols = 60;
let rows = 60;
let w;
let h;

function setup() {
  createCanvas(600, 600);
  w = width / cols;
  h = height / rows;
}

function draw() {

  /** Reset always when end is reached and at start. */
  if ((i % (cols * rows)) == 0) {
    background(0);
    i = 0;
  }

  /** Calculate the coordinates based on the indices. */
  let x = (i % cols) * w;
  let y = floor(i / rows) * h;

  /** Draw the line based on a 50-50 probability. */
  stroke(255);
  strokeWeight(2);
  if (random() < 0.5) {
    line(x, y, x + w, y + h);
  } else {
    line(x + w, y, x, y + h);
  }

  /** Increase index. */
  i++;
}