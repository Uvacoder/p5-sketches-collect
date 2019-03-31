let N; // Let N be the number of recursive iterations.
let A; // Let angle A be the angle between branches.
let dA; // Let dA be the step between angles.
let Len; // Length of the original branch.
let F; // Factor of shortening between branches.

function setup() {
  createCanvas(600, 600);
  N = 9;
  A = 45;
  dA = 0.5;
  Len = 100;
  F = 0.7;
  angleMode(DEGREES);
}

function draw() {
  
  background(0);
  stroke(255);
  strokeWeight(1);
  noFill();

  push();

  translate(width / 2, height - 150);
  line(0, 0, 0, -Len);
  translate(0, -Len);
  branch(N, Len * F);

  pop();
  A += dA;  // Increase the angle.
  if (A > 360) {
    A -= 360;
  }
}

function branch(n, len) {
  if (n == 0) return;

  push();
  rotate(-A);
  line(0, 0, 0, -len);
  translate(0, -len);
  branch(n - 1, len * F);
  pop();

  push();
  rotate(A);
  line(0, 0, 0, -len);
  translate(0, -len);
  branch(n - 1, len * F);
  pop();
}