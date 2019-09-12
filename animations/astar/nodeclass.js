// Node class with all the data about a node
class Node {

	// Node is constructed with several options, several default settings and a location
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

	// Faster functions to see if node exists in closed or open
	isClosed() {
		return !!closed.find(node => node.index === this.index);
	}
	isOpen() {
		return !!open.find(node => node.index === this.index);
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