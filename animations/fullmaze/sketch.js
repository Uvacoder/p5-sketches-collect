
// All main variables
let nodes;
let startNode;
let endNode;
let generatingMaze = false;
let pathFinding = false;
let foundPath;

// Dimensions
cols = 65;
rows = 35;
size = 15;

// Other settings
framerate = 60;

// Setup
function setup() {

	// Set up canvas
	createCanvas(cols * size, rows * size);
	frameRate(framerate);

	// Generate node array, start and end node
	const generated = generateNodes(1, 1, cols - 2, rows - 2);
	nodes = generated.newNodes;
	startNode = generated.newStartNode;
	endNode = generated.newEndNode;

	// Generate maze
	initializeMazeGeneration();
}

// Performs all algorithmic logic and calls the algorithm step and initialization functions
function logic() {

	// Generate maze until done, then initialize for path finding
	if (generatingMaze) {
		let completed = generateMazeStep();
		generatingMaze = !completed;
		pathFinding = completed;
		if (completed) {
			initializePathFinding();
		}
	}

	// While pathfinding, perform step and get path to current
	else if (pathFinding) {
		let result = astarStep();
		if (result) foundPath = result;
	}
}

function draw() {

	// Perform logic before drawing each frame
	logic();

	// No stroke to anything
	noStroke();

	// Draw all nodes as white or black depending on traversability
	if (nodes) {
		nodes.forEach(n => {
			n.traversable ? fill(255) : fill(0);
			rect(n.x * size, n.y * size, size, size);
		});
	}

	// While generating maze
	if (generatingMaze) {

		// Draw backtracked cells in maze generation
		fill(150, 150, 150);
		nodes.filter(n => n.cellBacktracked && n.traversable).forEach(n => {
			rect(n.x * size, n.y * size, size, size);
		});

		// Draw current cell in maze generation
		fill(255, 0, 0);
		if (mazeCurrent) {
			rect(mazeCurrent.x * size, mazeCurrent.y * size, size, size);
		}
	}

	// Draw open nodes
	fill(200, 250, 250);
	openNodes.forEach(n => {
		rect(n.x * size, n.y * size, size, size);
	});

	// Draw closed nodes
	fill(250, 180, 180);
	closedNodes.forEach(n => {
		rect(n.x * size, n.y * size, size, size);
	});


	// Draw path if found
	fill(0, 0, 255);
	if (foundPath) {
		foundPath.forEach(n => {
			rect(n.x * size, n.y * size, size, size);
		});
	}

	// Draw ending and starting nodes (fixed coordinates)
	fill(0, 255, 0);
	rect(0, size, size, size);
	rect((cols - 1) * size, (rows - 2) * size, size, size);
}