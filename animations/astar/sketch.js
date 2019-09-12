let nodes;
let open;
let closed;
let current;
let rows = 30;
let cols = 50;
let resolution = 20;
let endNode;
let finished = false;

function setup() {

	// Set up canvas
	createCanvas(cols * resolution, rows * resolution);

	// Pick starting index and ending index
	let start = Math.floor(Math.random() * rows * cols);
	let end = Math.floor(Math.random() * rows * cols);
	let startNode;
	open = [];
	closed = [];

	// Set up cells array in loop
	nodes = [];
	for (let i = 0; i < rows * cols; i++) {

		// Get cell properties and create cell
		let row = floor(i / cols);
		let col = floor(i % cols);
		let starting = (i === start);
		let ending = (i === end);
		let traversable = Math.random() > 0.4 || (starting || ending);
		let node = new Node(col, row, {
			index: i, traversable,
			start: starting, end: ending
		});

		// Save cell to cells array
		nodes[i] = node;

		// Save and set up start and end cell
		if (starting) {
			startNode = node;
		} else if (ending) {
			endNode = node;
		}

		// Set up start node: calculate costs and add to open
	}
	open.push(startNode);
	startNode.g_cost = 0;
	startNode.h_cost = calculateCost(startNode.x, startNode.y, endNode.x, endNode.y);
	startNode.f_cost = calculateCost(startNode.x, startNode.y, endNode.x, endNode.y);
	frameRate(15)
}

function calculateCost(x1, y1, x2, y2) {
	const dx = Math.abs(x1 - x2);
	const dy = Math.abs(y1 - y2);
	const diff = Math.abs(dx - dy);
	const smallerDist = dx < dy ? dx : dy;
	const diagonals = 14 * smallerDist;
	const straights = 10 * diff;
	return diagonals + straights;
}

function keyPressed() {
	astar()
}

function astar() {

	if (finished) {
		finished = false;
		setup()
		return;
	}

	// If there are no open left, finish
	if (open.length === 0) {
		console.log("NO ROUTE FOUND");
		finished = true;
		return;
	}

	// Set current to node in open with lowest f_cost
	let lowestFCostNodes = [];
	let lowestFCost = Number.MAX_SAFE_INTEGER;
	for (let i = 0; i < open.length; i++) {
		let f = open[i].f_cost;
		if (f < lowestFCost) {
			lowestFCost = f;
			lowestFCostNodes = [open[i]];
		} else if (f == lowestFCost) {
			lowestFCostNodes.push(open[i]);
		}
	}
	if (lowestFCostNodes.length === 1) {
		current = lowestFCostNodes[0];
	} else {

		// If multiple nodes have same f_cost figure out a random one with lowest h_cost
		let lowestHCostNodes = [];
		let lowestHCost = Number.MAX_SAFE_INTEGER;
		for (let i = 0; i < lowestFCostNodes.length; i++) {
			let h = lowestFCostNodes[i].h_cost;
			if (h < lowestHCost) {
				lowestHCost = h;
				lowestHCostNodes = [lowestFCostNodes[i]];
			} else if (h === lowestHCost) {
				lowestHCostNodes.push(lowestFCostNodes[i]);
			}
		}
		current = lowestHCostNodes[0];
	}

	// Remove current from open and add to closed
	open = open.filter(x => x.index !== current.index)
	closed.push(current);

	// If current is target node, path has been found, find path and end
	if (current.end) {
		console.log("ROUTE FOUND");
		finished = true;
		while (current.parent) {
			current.belongsToPath = true;
			current = current.parent;
		}
		return;
	}

	// For each neighbour of the current node
	const neighbourCoordinates = [[1, 0], [0, 1], [-1, 0], [0, -1], [1, 1], [-1, -1], [1, -1], [-1, 1]];
	for (let coordinates of neighbourCoordinates) {

		// Get its coordinates and get the neighbour
		const dx = coordinates[0];
		const dy = coordinates[1];
		const x = current.x + dx;
		const y = current.y + dy;
		const neighbour = nodes.find(node => node.x === x && node.y === y);

		// If neihbour exists
		if (neighbour) {

			// If neighbour is traversable and not closed
			if (neighbour.traversable && !neighbour.isClosed()) {

				// Calculate new h, g and f costs for neighbour
				const new_h_cost = calculateCost(x, y, endNode.x, endNode.y)
				const new_g_cost = current.g_cost + (dx === 0 || dy === 0) ? 10 : 14;
				const new_f_cost = new_h_cost + new_g_cost;

				// If neighbour doesn't have or has higher cost, replace with new cost and change neighbour's parent to this
				if (!neighbour.f_cost || neighbour.f_cost > new_f_cost) {
					neighbour.f_cost = new_f_cost;
					neighbour.h_cost = new_h_cost;
					neighbour.g_cost = new_g_cost;
					neighbour.parent = current;
				}

				// If new neighbour is not yet in open, add it to open
				if (!neighbour.isOpen()) {
					open.push(neighbour);
				}
			}
		}
	}
}

/**
 * // A* algorithm pseudocode
 *
 * OPEN    // set of nodes to be evaluated
 * CLOSED  // set of nodes already evaluated
 *
 * loop
 * 		current = node in OPEN with the lowest f_cost
 * 		remove current from OPEN
 * 		add current to CLOSED
 *
 * 		if current is the target node  // path has been found
 * 			return
 *
 * 		foreach neighbour of the current node
 * 			if neighbour is not traversable or neighbour is in CLOSED
 * 				skip to the next neighbour
 * 			else if new path to neighbour is shorter or neighbour is not in OPEN
 * 				set f_cost of neighbour
 * 				set parent of neighbour to current
* 			if neighbour is not in OPEN
 * 				add neighbour to OPEN
 */

function draw() {

	astar();

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
	if (false) {
		for (let i = 0; i < rows * cols; i++) {
			nodes[i].drawScore()
		}
	}
}

class Node {

	constructor(x, y, options) {
		this.x = x;
		this.y = y;
		this.index = options.index;
		this.start = options.start;
		this.end = options.end;
		this.traversable = options.traversable;
		this.belongsToPath = false;
		this.g_cost = null;
		this.h_cost = null;
		this.f_cost = null;
		this.parent = null;
	}

	isClosed() {
		return !!closed.find(node => node.index === this.index);
	}
	isOpen() {
		return !!open.find(node => node.index === this.index);
	}
	setStroke(s) {
		stroke(s[0], s[1], s[2]);
		strokeWeight(s[3]);
	}
	setFill(f) {
		fill(f[0], f[1], f[2]);
	}

	draw(options) {
		this.setStroke(options.stroke);
		this.setFill(options.fill);
		if (this.isClosed()) this.setFill(options.closedFill);
		if (this.isOpen()) this.setFill(options.openFill);
		if (this.end) this.setFill(options.endFill);
		if (this.start) this.setFill(options.startFill);
		if (this.belongsToPath) this.setFill(options.pathFill);
		if (!this.traversable) this.setFill(options.blockFill);

		rect(this.x * resolution, this.y * resolution, resolution, resolution);
	}

	drawScore() {
		fill(255);
		stroke(0);
		textSize(16);
		textAlign(CENTER);
		if (this.g_cost !== null && this.f_cost !== null && this.h_cost !== null) {
			text(this.f_cost, (this.x + 0.5) * resolution, (this.y + 0.9) * resolution);
			textSize(10);
			text(this.h_cost, (this.x + 0.7) * resolution, (this.y + 0.3) * resolution);
			text(this.g_cost, (this.x + 0.3) * resolution, (this.y + 0.3) * resolution);
		}
	}
}