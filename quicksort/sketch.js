
/** Global variables */

let data = [];  // The original data set
let copy = [];  // The copy of the data for drawing purposes
let swaps = []; // All recorded swaps from the sort 
let index = 0;  // Current index in traversing the array swaps

let w = 1;  // Width of each pillar
let h;      // Height of value 1
let n;      // Size of data set

/** Creating the canvas and the data */
function setup() {
    createCanvas(600, 400); // Creating the canvas
    n = width / w;  // Calculating amount of data items (based on how many fit on canvas)
    h = height / n; // Calculating height corresponding to value 1
    for (let i = 0; i < n; i++) { data[i] = i; }   // Filling in the data
    copy = data.slice(); // Copying the data to the drawing array
}

/** Function to swap two elements at indices i, j in an array and if record is true, record it to swaps */
function swap(arr, i, j, record) {
    let temp = arr[i];  // Swapping algorithm
    arr[i] = arr[j];
    arr[j] = temp;
    if (record) {   // If recording, create swap object and push it to swaps
        swaps.push({
            "a":i,
            "b": j
        });
    }
}

/** Quicksort algorithm */
function quicksort(arr, lo, hi, level) {
    if (lo < hi) {
        let pivot = arr[hi];
        let i = lo;
        for (let j = lo; j < hi; j++) {
            if (arr[j] < pivot) {
                swap(arr, i, j, true);
                i++;
            }
        }
        swap(arr, i, hi, true);
        quicksort(arr, lo, i - 1, level + 1);
        quicksort(arr, i + 1, hi, level + 1);
    }
}

/** Each frame, draw data as rectangles and swap elements one by one */
function draw() {

    /** Drawing each data item as a pillar */
    background(0);
    noStroke();
    fill(255);
    for (let i = 0; i < n; i++) {
        rect(w * i, height, w, -copy[i] * h);
    }

    /** Traversing through the recorded swaps one by one each frame */
    for (let i = 0; i < 5; i++) {
        if (swaps.length > 0 && index < swaps.length) {
            let s = swaps[index++];
            swap(copy, s.a, s.b);
        } else {
            console.log("Finished");
            noLoop();
            break;
        }
    }
}

/** Reset sorting on mouse pressed */
function mousePressed() {
    swaps = []; // Reset recorded swaps
    data = shuffle(data); // Reshuffle data
    copy = data.slice(); // Copy shuffled data to drawData
    index = 0; // Reset index
    quicksort(data, 0, data.length - 1, 0); // Sort data and re-record swaps
    loop(); // Continue looping
}