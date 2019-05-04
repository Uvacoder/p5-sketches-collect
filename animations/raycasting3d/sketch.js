
let particle;
let bounds = [];
let boxes = [];

let W = 400;
let H = 400;

function setup() {
    createCanvas(2 * W, H);
    let rows = 10;
    let cols = 10;
    let w = W / rows;
    let h = H / cols;
    particle = new Particle((W - w) / 2, (H - h) / 2, 0, radians(75), radians(0.4));
    for (let i = 0; i < 10; i++) {
        createBox(int(random(cols)) * w, int(random(rows)) * h, w, h, true);
    }
    createBox(0, 0, W, H, false);
}

function createBox(x, y, w, h, solid) {
    let box = new Box(x, y, w, h, solid);
    for (let b of box.bounds) { bounds.push(b); }
    boxes.push(box);
}

function draw() {

    /** Controls */
    const mov = 5;
    const rot = 0.05;
    if (keyIsDown(65)) { particle.move(0, -mov); } // A Strafe left
    if (keyIsDown(68)) { particle.move(0,  mov); } // D Strafe right
    if (keyIsDown(87)) { particle.move( mov, 0); } // W Forwards
    if (keyIsDown(83)) { particle.move(-mov, 0); } // S Backwards
    if (keyIsDown(37)) { particle.rotate(-rot); }  // Left arrow rotate left
    if (keyIsDown(39)) { particle.rotate( rot); }  // Right arrow rotate right

    /** Casting the rays */
    particle.intersect(bounds);

    /** Rendering all elements of the 2D ray casting */
    background(0);
    particle.show();
    for (let b of boxes) {
        b.show();
    }

    /** Rendering the background for the ray casting */
    fill(0);
    translate(W, 0);
    rect(0, 0, W, H);
    noStroke();
    let thickness = 10;
    for (let h = H/2; h < H; h += thickness) {
        let b = map(abs(h - H/2), 0, H/2, 0, 50);
        fill(b);
        rect(0, h, W, h + thickness);
    }

    /** Rendering the 3D ray casting */
    let w = W / particle.rays.length;
    for (let i = 0; i < particle.rays.length; i++) {
        let ray = particle.rays[i];
        let c = cos(ray.dir.angleBetween(particle.dir));
        let h = H / (c * map(ray.length, 0, sqrt(W * W + H * H), 0, 10));
        let b = 0.9 * map(ray.length ** 2, 0, W * W, 255, 20);
        fill(b);
        rect(w * i, H / 2 - h / 2, w + 0.5, h);
    }
    translate(-W, 0);
}