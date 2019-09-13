// Node class with all the data about a node
class Node {

	// Node is constructed with several options, several default settings and a location
	constructor(x, y, i, options) {
		this.x = x;
		this.y = y;
		this.index = i;
		this.start = false;
		this.end = false;
		this.traversable = false;
		this.g_cost = null;
		this.h_cost = null;
		this.parent = null;
	}

	// Generates cell generating properties for this cell
	generateCellProperties() {

		// Only cells on odd x and y values can be generated as cells
		if (this.x % 2 === 0 || this.y % 2 === 0) return;

		// Cell coordinates, cell status, has cell properties and is traversable
		this.cellX = this.x / 2;
		this.cellY = this.y / 2;
		this.cellVisited = false;
		this.cellBacktracked = false;
		this.hasCellProperties = true;
		this.traversable = true;
	}

	// Marks node as starting node
	makeStartingNode() {
		this.start = true;
	}

	// Marks node as ending node
	makeEndingNode() {
		this.end = true;
	}

	// Return f cost of node (f_cost = g_cost + h_cost)
	get f_cost() {
		return this.h_cost + this.g_cost;
	}

	// Faster functions to see if node exists in any array
	isIn(arr) {
		return !!arr.find(node => node.index === this.index);
	}

	// Faster functions to set strokes and fills from drawoptions
	setStroke(s) {
		stroke(s[0], s[1], s[2]);
		strokeWeight(s[3]);
	}
	setFill(f) {
		fill(f[0], f[1], f[2]);
	}

	// Draw the node
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

	// Draw the node's score
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