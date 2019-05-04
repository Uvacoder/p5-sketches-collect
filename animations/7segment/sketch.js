
let seg = [];
let segs = 8;


function setup() {
    createCanvas(600, 600);
    background(0);
    let dim = 35;
    for (let i = 0; i < segs; i++) {
        seg.push(new Display(40 + 2 * dim * i, 40, dim, 0.25, false));
        seg[i].set(0);
    }
    seg = seg.reverse();
}
function draw() {
    increment();
    for (let s of seg) {
        s.show();
    }
}
function increment() {
    let i = 0;
    while (seg[i] && seg[i].next()) {
        i++;
    }
}

