function calculateCost(x1, y1, x2, y2) {
	const dx = Math.abs(x1 - x2);
	const dy = Math.abs(y1 - y2);
	const diff = Math.abs(dx - dy);
	const smallerDist = dx < dy ? dx : dy;
	const diagonals = 14 * smallerDist;
	const straights = 10 * diff;
	return diagonals + straights;
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