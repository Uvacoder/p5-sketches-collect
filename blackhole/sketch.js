/** Constants: speed of light, gravitational constant and the mass of the black hole */
let c = 31;
let G = 2;
let mass = 5000;

/** All photons and the black hole */
let photons = [];
let blackhole;

/** Spacing between photons, current time, timelimit and timestep */
let spacing = 12;
let time = 0;
let timelimit;
let dt = 0.1;

/** Setup function */
function setup() {

  /** Create a canvas and initialize it with a black background */
  createCanvas(windowWidth, 600);
  background(0);

  /** Calculate the 'timelimit' for the lightrays' colors */
  timelimit = 8 * width * dt / c;

  /** Create each photon */
  for (let h = 0; h <= height; h += spacing) {
    photons.push(new Photon(width - 10, h));
  }

  /** Create the black hole */
  blackhole = new Blackhole(width / 2, height / 2, mass);
}

/** Each frame draw and update physics */
function draw() {

  /** For each photon p */
  for (let p of photons) {

    /** Gravitate the photon towards the black hole (adjust velocity) */
    blackhole.gravitate(p);

    /** Update the photons location */
    p.update();

    /** Draw the photon */
    p.show();
  }

  /** Draw the black hole */
  blackhole.show();

  /** Adjust the time */
  time += dt;
}

/** A photon, with simple physics */
class Photon {

  /** Constructing with a position and a velocity to the left */
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.prev = createVector(x, y);
    this.vel = p5.Vector.fromAngle(PI);
    this.vel.setMag(c);
  }

  /** Function to apply any force vector f to this photon */
  apply(f) {
    this.vel.add(f);
    this.vel.setMag(c);
  }

  /** Function to update the photon and move it */
  update() {
    this.prev = this.pos.copy();
    let dv = this.vel.copy();
    dv.mult(dt);
    this.pos.add(dv);
  }

  /** Function to draw the photon as a line between its current and previous position */
  show() {
    let t = time / timelimit; // Adjust colors according to the time
    strokeWeight(0.5);
    stroke(255 * t, 255 * t, 100 * t);
    line(this.prev.x, this.prev.y, this.pos.x, this.pos.y);
  }
}

/** An immovable blackhole */
class Blackhole {

  /** Construct with a position and a mass */
  constructor(x, y, M) {
    this.pos = createVector(x, y);
    this.M = M;
    this.R = (2 * G * M) / (c * c); // Event horizon radius R = 2GM / c^2
  }

  /** Function to gravitate a photon towards this black hole */
  gravitate(p) {
    let f = p5.Vector.sub(this.pos, p.pos);
    let r = f.mag();
    f.setMag((G * this.M) / (r * r));
    p.apply(f);
  }

  /** Function to draw the black hole as a circle */
  show() {
    noStroke();
    for (let r = this.R; r > 0; r -= 1) {
      let sin = Math.sin(0.2 * time - 0.2 * r)
      fill(20 * sin * sin, 0, 50 * sin * sin);
      circle(this.pos.x, this.pos.y, 2 * r);
    }
  }
}