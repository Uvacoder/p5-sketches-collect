

/**
 * Bounds describe lines, with which the rays of light can intersect.
 */
class Bound {
    
    /** Bounds are constructed using the coordinates for the two end points */
    constructor(x1, y1, x2, y2) {
        this.a = createVector(x1, y1);
        this.b = createVector(x2, y2);
    }

    /** Bounds are shown as a line segment between their end points */
    show() {
        stroke(255);
        strokeWeight(4);
        line(this.a.x, this.a.y, this.b.x, this.b.y);
    }
}

/**
 * Box is a wrapper class for four bounds with special rendering qualities.
 */
class Box {

    /** Boxes are constructed with the coordinates for the top left corner, */
    /** dimensions and a boolean value for whether the box is solid */
    constructor(x, y, w, h, solid) {
        this.bounds = [];
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.bounds.push(new Bound(x, y, x + w, y));
        this.bounds.push(new Bound(x + w, y, x + w, y + h));
        this.bounds.push(new Bound(x + w, y + h, x, y + h));
        this.bounds.push(new Bound(x, y + h, x, y));
        this.solid = solid;
    }

    show() {
        for (let b of this.bounds) { b.show(); }
        if (this.solid) {
            fill(255);
            rect(this.x, this.y, this.w, this.h);
        }
    }
}