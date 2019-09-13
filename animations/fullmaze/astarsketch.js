let nodes;
let open;
let closed;
let current;
let endNode;
let finished = false;

// Customizable settings
let resolution = 20;
let framerate = 15;
let percentageWalls = 0.4;

function xsetup() {

	// Set up canvas
	//createCanvas(cols * resolution, rows * resolution);
	frameRate(framerate)

	// Pick starting index and ending index
	let start = Math.floor(Math.random() * rows * cols);
	let end = Math.floor(Math.random() * rows * cols);
	let startNode;
	open = [];
	closed = [];
	nodes = [];

	// Set up cells array in loop
	for (let i = 0; i < rows * cols; i++) {

		// Get cell properties and create cell
		let row = floor(i / cols);
		let col = floor(i % cols);
		let starting = (i === start);
		let ending = (i === end);
		let traversable = Math.random() > percentageWalls || (starting || ending);
		let node = new Node(col, row, {
			index: i, traversable,
			start: starting, end: ending
		});

		// Save all cells and start and end node to special places
		nodes[i] = node;
		if (starting) {
			startNode = node;
		} else if (ending) {
			endNode = node;
		}
	}
	// Set up start node
	open.push(startNode);
	startNode.g_cost = 0;
	startNode.h_cost = calculateCost(startNode.x, startNode.y, endNode.x, endNode.y);
	startNode.f_cost = calculateCost(startNode.x, startNode.y, endNode.x, endNode.y);
}

function xdraw() {

	// Run algorithm each frame
	astar();

	// Drawing options
	const drawingOptions = {
		fill: [255, 255, 255],
		endFill: [100, 180, 255],
		startFill: [100, 255, 80],
		openFill: [100, 200, 200],
		closedFill: [200, 100, 100],
		blockFill: [0, 0, 0],
		pathFill: [50, 255, 50],
		stroke: [0, 0, 0, 0]
	}

	// Draw everything
	for (let i = 0; i < rows * cols; i++) {
		nodes[i].draw(drawingOptions)
	}

	// This would draw the g/f/h scores
	// for (let i = 0; i < rows * cols; i++) {
	// nodes[i].drawScore()
	// }
}