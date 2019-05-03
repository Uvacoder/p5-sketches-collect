let inc = 0.02;     // Amount of incrementing to each offset
let scl = 50;       // Scale of each grid cell
let cols, rows;     // Column and row count
let zoff = 0;       // Universal Z offset for animation
let off = 100;      // General offset
let particles = []; // Array for particles
let count = 1000;   // Particle count
let flowfield = []; // Flowfield containing all the vectors
let drag = 0.99;    // Drag coefficient
let shadow = 0.12;  // Shadow coefficient
let mag = 0.05;     // Flowfield vector magnitude coefficient
let zinc = 0.005;   // Zoff speed change
let hue = 0;        // Current hue
let hinc = 0.002;    // Hue increase per frame

/** Setup dimensions, create new particles and initialize
 *  flowfield as a 2-dimensional array of empty vectors. */
function setup() {
  createCanvas(windowWidth, windowHeight);
  cols = width / scl;
  rows = height / scl;
  for (let i = 0; i < count; i++) {
    particles[i] = new Particle()
  }
  for (let x = 0; x < cols; x++) {
    flowfield[x] = [];
    for (let y = 0; y < rows; y++) {
      flowfield[x][y] = createVector(0, 0);
    }
  }
  background(0);
}

function draw() {

  /** Draw see-through backgrounds */
  colorMode(RGB, 255);
  fill(0, 0, 0, shadow * 255);
  noStroke();
  rect(0, 0, width, height);
  stroke(255);

  /** Loop over field, increasing y- and xoff and creating
   *  a new vectorfield each time, saving all the vectors
   *  to flowfield. */
  let yoff = 0;
  for (let y = 0; y < rows; y++) {
    let xoff = 0;
    for (let x = 0; x < cols; x++) {
      let v = p5.Vector.fromAngle(noise(xoff, yoff, zoff) * PI * 8);
      let m = noise(xoff + off, yoff + off, zoff + off);
      v.setMag(m * mag);
      //drawFieldVector(v, x, y);
      flowfield[x][y] = v;
      xoff += inc;
    }
    yoff += inc;
  }
  zoff += zinc;
  hue += hinc;

  /** Loop over all particles, animating them and updating
   *  their physics. */
  for (let p of particles) {
    let x = floor(p.pos.x / scl);
    let y = floor(p.pos.y / scl);
    let force = flowfield[x][y];
    p.applyForce(force);
    p.update();
    p.show();
  }
}

/** Draws a given field vector. */
function drawFieldVector(v, x, y) { 
  stroke(v.mag() * 1000);
  strokeWeight(v.mag() * 50);
  push();
  translate((x + 0.5) * scl, (y + 0.5) * scl);
  rotate(v.heading());
  line(-scl / 2, 0, scl / 2, 0);
  pop();
}