
/**
 * Rays describe single rays of light eminating off a position
 * into a given direction. Rays can intersect with bounds, after
 * which they stop at the given bound.
 */
class Ray {

    /** Rays are constructed with a position and a starting angle */
    constructor(pos, a) {
        this.pos = pos;
        this.dir = p5.Vector.fromAngle(a);
        this.length = Infinity; // Initially the length is infinite
        this.intersect = null;  // Initially there is no intersection point
    }

    /** Intersects this ray with all given bounds: records the nearest intersection */
    intersectAll(bounds) {
        let recP = null;
        let recD = Infinity;
        for (let bound of bounds) {
            let p = this.intersectSingle(bound);
            if (p) {
                let d = this.pos.dist(p);
                if (d < recD) {
                    recD = d;
                    recP = p;
                }
            }
        }
        this.length = recD;
        this.intersect = recP;
    }

    /** Intersects this ray with a single bound using the line-line intersection algorithm */
    /** The function returns a vector, if an intersection point exists, else null */
    intersectSingle(bound) {
        let x1 = this.pos.x;
        let y1 = this.pos.y;
        let x2 = this.pos.x + this.dir.x;
        let y2 = this.pos.y + this.dir.y;
        let x3 = bound.a.x;
        let y3 = bound.a.y;
        let x4 = bound.b.x;
        let y4 = bound.b.y;
        let den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
        if (den != 0) {
            let t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
            let u = ((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / -den;
            if (u >= 0 && u <= 1 && t >= 0) {
                let px = x1 + t * (x2 - x1);
                let py = y1 + t * (y2 - y1);
                return createVector(px, py);
            }
        }
    }

    /** Renders this ray of light but only if it intersects a bound at some point */
    show() {
        if (this.intersect) {
            stroke(255);
            strokeWeight(0.5);
            let x = this.dir.x * this.length;
            let y = this.dir.y * this.length;
            line(this.pos.x, this.pos.y, this.intersect.x, this.intersect.y);
        }
    }

}