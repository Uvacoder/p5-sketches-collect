
/** Class to represent the particles flowing through the
 *  flowfield. */
class Particle {

    /** Constructs a particle without acceleration or
     *  velocity to a random spot in the canvas. */
    constructor() {
        this.pos = createVector(random(width), random(height));
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
    }

    /** Updates this object based on its velocity and
     *  applied forces, looping it over the screen. */
    update() {
        this.vel.add(this.acc);
        this.vel.mult(drag);
        this.pos.add(this.vel);
        this.acc.mult(0);
        if (this.pos.x > width)  this.pos.x -= width;
        if (this.pos.y > height) this.pos.y -= height;
        if (this.pos.x < 0) this.pos.x += width;
        if (this.pos.y < 0) this.pos.y += height;
    }

    /** Applies a given force (vector) to this object. */
    applyForce(force) {
        this.acc.add(force);
    }

    /** Renders this object as a point. */
    show() {
        colorMode(HSB, 1.0);
        stroke(hue % 1, this.vel.mag(), 1.0);
        strokeWeight(3);
        point(this.pos.x, this.pos.y);
    }
}