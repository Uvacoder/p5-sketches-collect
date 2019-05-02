
/**
 * Particles describe positional and directional objects, which eminate
 * rays from their location in the direction the particle is looking at.
 */
class Particle {

    /**
     * A particle is constructed using a position (x, y), a starting
     * angle (a), a field of view angle fov and a resolution angle, for
     * how dense the rays are. All angles are in radians.
     */
    constructor(x, y, a, fov, res) {

        /** Constructing position, direction and ray array */
        this.pos = createVector(x, y);
        this.dir = p5.Vector.fromAngle(a);
        let count = fov / res;
        this.rays = [];

        /** Constructing each ray */
        let angle = -res * 0.5 * count;
        for (let i = 0; i < count; i++) {
            angle += res;
            this.rays[i] = new Ray(this.pos, angle);
        }
    }

    /** Moves this particle forward or strafes by the given amounts */
    move(f, s) {
        let vel = createVector(f, s);
        vel.rotate(this.dir.heading());
        this.pos.add(vel);
    }

    /** Rotates this particle by the given angle */
    rotate(a) {
        this.dir.rotate(a);
        for (let ray of this.rays) {
            ray.dir.rotate(a);
        }
    }

    /** Intersect each ray eminating from this particle with the bounds */
    intersect(bounds) {
        for (let ray of this.rays) {
            ray.intersectAll(bounds);
        }
    }

    /** Renders the particle as a circle and all the rays seperately */
    show() {
        fill(255);
        circle(this.pos.x, this.pos.y, 5);
        for (let ray of this.rays) {
            ray.show();
        }
    }

}