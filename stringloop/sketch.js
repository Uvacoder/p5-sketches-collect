
let loops = [];
let loopCount = 6;
let time = 0;
let stopped = false;

let sliders, resetButton;
let fs, ps, cs, ss, ds, vs, ts, rs, gs, bs;

// Set up animation
function setup() {

    // Create canvas
    createCanvas(800, 800);

    // Create sliders and apply id
    sliders = createDiv();
    sliders.id("sliders");

    // Create each property slider
    fs = propertySlider("Friction", "f", 0, 0.1, 0.005, 0);
    ps = propertySlider("Pull", "p", 0.001, 1.0, 0.05, 0);
    cs = propertySlider("Count", "c", 1, 10, 4, 1);
    ss = propertySlider("Size", "s", 0, 200, 100, 0);
    ds = propertySlider("Distance", "d", 0, 0.75 * width, 0.4 * width, 0);
    vs = propertySlider("Speed", "v", 0, 10, 5, 0);
    ts = propertySlider("Thickness", "t", 0.1, 0.5, 0.2, 0);
    os = propertySlider("Opacity", "o", 0, 255, 50, 0);
    rs = propertySlider("Red", "r", 0, 255, 255, 0);
    gs = propertySlider("Green", "g", 0, 255, 255, 0);
    bs = propertySlider("Blue", "b", 0, 255, 255, 0);

    // Create reset button to sliders div and apply reset function to it
    resetButton = createButton('Reset');
    resetButton.parent(sliders);
    resetButton.mousePressed(reset);

    // Create extra information paragraph to sliders div
    let info = createP("Press spacebar to pause");
    info.parent(sliders);

    // Rotate to correct orientation
    rotate(HALF_PI);

    // Set white stroke
    noFill();
    reset();
}

/** Creates a property adjusting slider and returns it */
function propertySlider(name, letter, min, max, def, stp) {

    // Create a new slider s and corresponding paragraph p
    let s = createSlider(min, max, def, stp);
    let p = createP("" + name + " (" + s.value().toPrecision(3) + ")");

    // Set id of paragraph to given letter
    p.id(letter);

    // Make slider and paragraph children of sliders div
    s.parent(sliders);
    p.parent(sliders);

    // Each time slider is updated, update text in paragraph
    s.input( function() {
        document.getElementById(letter).innerHTML = "" + name + " (" + s.value().toPrecision(3) + ")";
    });

    // Return the created slider
    return s;
}

/** Resets the animation */
function reset() {

    // Hide everything previously drawn
    background(0);

    // Set color based on sliders
    stroke(rs.value(), gs.value(), bs.value(), os.value());

    // Set stroke weight based on sliders
    strokeWeight(ts.value());

    // Recreate loops based on sliders
    loops = createLoops();
}

/** Draws all the loops and adjusts time */
function draw() {

    // Continue animation only if not stopped
    if (!stopped) {

        // Adjust time
        time += 0.01;

        // For each loop seperately
        for (let loop of loops) {

            // Update towards middle
            loop.update(400, 400);

            // Render loop
            loop.show();
        }
    }
}

/** Creates the loops specified by the sliders and returns them */
function createLoops() {

    // New array for all the created loops
    let created = [];

    // Count angle between each loop
    let angle = TWO_PI / cs.value();

    // Go through each loop at their angles
    for (let a = 0; a < cs.value() * angle - 0.9 * angle; a += angle) {

        // Calculate starting position from distance slider property and angle
        let x = width / 2  + ds.value() * cos(a);
        let y = height / 2 + ds.value() * sin(a);

        // Create a new loop with the slider properties, starting from the top and append it to created
        created.push(new Loop(x, y, ss.value(), HALF_PI + a, vs.value(), 1 - fs.value(), ps.value()));
    }

    // Return all created loops
    return created;
}

/** Loop describes a single loop object in the animation */
class Loop {

    /**
     * Loops are constructed with a position (x, y), a radius,
     * an angle of initial velocity, the initial velocity,
     * amount of friction and strength of pulling force
     * affecting the loop
     */
    constructor(x, y, radius, angle, speed, friction, pull) {

        // Constructing given properties of the loop
        this.pos = createVector(x, y);
        this.radius = radius;
        this.vel = p5.Vector.fromAngle(angle);
        this.vel.setMag(speed);
        this.friction = friction;
        this.pull = pull;

        // Each loop has a random offset for unique perlin noise wobbling
        this.off = random(1000); 
    }

    /**
     * Updating a loop applies physics: the loop is pulled towards the target
     * coordinates with the specified pull force and slowed down by the
     * specified friction.
     */
    update(x, y) {

        // Creating a vector of the target
        let target = createVector(x, y);

        // Calculating direction of acceleration
        let acc = p5.Vector.sub(target, this.pos);

        // Calculating force of acceleration
        acc.setMag(this.pull);

        // Slowing down due to friction
        this.vel.mult(this.friction);

        // Accelerating towards target
        this.vel.add(acc);

        // Moving by velocity
        this.pos.add(this.vel);
    }

    /**
     * Loops are rendered as wobbly circles using a polar perlin noise loop
     * with time as the z offset in order to achieve animated wobbling radius
     * for the circle
     */
    show() {

        beginShape();
        
        // Rendering the circle, an angle at time taking a step of 0.01
        for (let a = 0; a <= TWO_PI; a += 0.01) {
            
            // Polar noise of angle A with time on the z-axis
            let n = noise(this.off + cos(a), sin(a), time);

            // Radius mapped to 80% - 120% of the radius based on the noise
            let r = map(n, 0, 1, 0.8 * this.radius, 1.2 * this.radius);

            // Rendering the part of the circle at angle a with radius r
            vertex(this.pos.x + r * cos(a), this.pos.y + r * sin(a));
        }
        endShape();
    }
}

/** Pauses and continues the animation on spacebar */
function keyPressed() {
    if (key == ' ') {
        stopped = !stopped;
    }
}
