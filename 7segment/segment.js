/**
 * A segment describes a single piece of a seven-segment display.
 */
class Segment {

    /** Constructor function takes a position x, y,
     *  dimensions (width and height) and a boldness b.
     *  By default each segment is off. */
    constructor(x, y, w, h, b) {
        this.x1 = x;
        this.y1 = y;
        this.x2 = x + w;
        this.y2 = y + h;
        this.on = false;
        this.b = b;
    }
    /** Toggles the state of this segment */
    toggle() {
        this.on = !this.on;
    }
    /** Renders this segment */
    show() {
        if (this.on) {
            stroke(255, 0, 0);
        } else { 
            stroke(100, 0, 0);
        }
        strokeWeight(this.b);
        line(this.x1, this.y1, this.x2, this.y2);
    }
}