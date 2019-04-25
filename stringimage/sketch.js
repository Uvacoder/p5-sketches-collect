let img;  /** The current chosen image */
let pts = 255;  /** The amount of points on the circle */
let threads = [];  /** Array for all the created threads */
let threshold = 0.01;  /** Threshold 0.0 - 1.0 for the threads */
let step = 10;  /** Step size in pixels for traversing the image */
let dens; /** Pixel density */
let angle;  /** Angle between each point */

/** Function to preload the chosen image */
function preload() {
  img = loadImage("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNmGequRMrKDrjDri3eLJCcoBxeOPQxj6B9RZ9tENhnV59GcGesQ");
}

/** Function to load the pixels and draw the background */
function setup() {
  createCanvas(600, 600);

  /** Load the image's pixels but hide it */
  image(img, 0, 0, width, height, 0, 0, img.width, img.width);
  loadPixels();
  background(0);

  /** Calculate necessary variables */
  dens = pixelDensity();
  angle = TWO_PI / pts;

  /** Draw background of circle */
  noStroke();
  fill(255);
  ellipse(width / 2, height / 2, width, height);
  
  /** Drawing the circle points */
  strokeWeight(4);
  stroke(0);
  for (let i = 0; i < pts; i++) {
    let x = width / 2 * (1 + cos(i * angle));
    let y = height / 2 * (1 + sin(i * angle));
    point(x, y);
  }  
}

/** Drawing by creating threads one by one */
let currentPt = 0;
function draw() {
  if (currentPt < pts) {
    strokeWeight(2);
    stroke(0);
    let thr = createThread(currentPt);
    for (let t of thr) {
      line(t.x1, t.y1, t.x2, t.y2);
    }
    currentPt++;
  }
}


/** Function that creates the next thread. */
function createThread(pt) {

  /** Array for all new threads */
  let newThreads = [];

  /** Point A, its angle a, coordinates ax, ay and position vector va */
  let a = pt * angle;
  let ax = width  / 2 * cos(a);
  let ay = height / 2 * sin(a);
  let va = createVector(ax, ay);
  
  /** For each point B, its angle b, coordinates bx, by and position vector vb */
  for (let i = 0; i < pts; i++) {

    let b = i * angle;
    let bx = width  / 2 * cos(b);
    let by = height / 2 * sin(b);
    let vb = createVector(bx, by);

    /** Vector sv from point A to B, size of step */
    let sv = p5.Vector.sub(vb, va);
    sv.normalize();
    sv.mult(step);

    /** Current position starts at A, traversing by sv until B */
    let pos = va.copy();

    /** Brightness accumulator and threshold */
    let steps = va.dist(vb) / step;
    let bright = steps * 255;
    let thresh = steps * 255 * threshold;

    /** Traversing from A to B by sv and accumulating brightness */
    for (let j = 0; j < steps; j++) {

      let loc = (pos.x + width / 2) + width * (pos.y + height / 2);
      let index = 1 + floor(loc) * 4 * dens;
      bright -= pixels[index];
      pos.add(sv);
    
    }

    /** If brightness exceeds threshold, create a new thread */
    if (bright < thresh) {
      newThreads.push({
        "x1":  width / 2 * (1 + cos(a)),
        "y1": height / 2 * (1 + sin(a)),
        "x2":  width / 2 * (1 + cos(b)),
        "y2": height / 2 * (1 + sin(b))
      });
    }
  }

  /** Saving the new threads */
  for (let thread of newThreads) {
    threads.push(thread);
  }
  
  /** Returning each new thread */
  return newThreads;
}