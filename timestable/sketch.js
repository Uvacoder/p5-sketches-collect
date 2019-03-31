
/** Initializing the global multiplier variable N and the
 *  multiplier step dN and the amount of points on the
 *  circle PTS and a raius R.
 */
let n = 0;
let dn = 0.01;
let pts = 250;
let r;

/** Creating a canvas and precalculating the radius r. */
function setup() {
  createCanvas(600, 600);
  r = 0.45 * width;
}

function draw() {

  /** Applying a new translation and setting HSB color mode. */
  applyMatrix();
  colorMode(HSB, pts);
  translate(width / 2, height / 2);

  /** Drawing the circle and background. */
  background(0);
  noFill();
  stroke(255);
  ellipse(0, 0, 2 * r, 2 * r);

  /** Drawing each line by calculating the starting angle s
   *  and ending angle e and setting the hue.
   */
  for (let i = 0; i < pts; i ++) {
      stroke(i, pts, pts);
      let s = i * (TWO_PI / pts);
      let e = (n * i) * (TWO_PI / pts);
      line(r * cos(s), r * sin(s), r * cos(e), r * sin(e));
  }

  /** Increasing N each frame by dN. */
  n += dn;

  /** Resetting the translation. */
  resetMatrix();
}