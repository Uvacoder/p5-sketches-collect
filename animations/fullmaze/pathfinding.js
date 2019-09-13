
// Set of open and closed nodes for pathfinding algorith
let openNodes = [];
let closedNodes = [];

// Helper function for calculating distance cost between two nodes n1 and n2
function calculateCost(n1, n2) {
	const dx = Math.abs(n1.x - n2.x);
	const dy = Math.abs(n1.y - n2.y);
	return dx < dy
		? 14 * dx + 10 * (dy - dx)
		: 14 * dy + 10 * (dx - dy);
}

// Initializes open nodes with start node
function initializePathFinding() {
	openNodes = [startNode];
}

// Bulk of the astar algorithm
function astarStep() {

	// If there are no open left, finish
	if (openNodes.length === 0) {
		console.log("NO ROUTE FOUND");
		return;
	}

	// Set up a current node
	let astarCurrent;

	// Go through all nodes
	for (let n of openNodes) {

		// If no node found yet, set any node as optimal node
		if (!astarCurrent) astarCurrent = n;

		// If better g_cost, or same g_cost and better h_cost replace optimal node
		const lowerG = n.g_cost < astarCurrent.g_cost;
		const equalG = n.g_cost === astarCurrent.g_cost;
		const lowerH = n.h_cost < astarCurrent.h_cost;
		if (lowerG || (equalG && lowerH)) {
			astarCurrent = n;
		}
	}

	// Remove current from open and add to closed
	openNodes = openNodes.filter(x => x.index !== astarCurrent.index);
	closedNodes.push(astarCurrent);

	// If current is target node, path has been found, find path and end
	if (astarCurrent.end) {
		console.log("ROUTE FOUND");
		pathFinding = false;
		return getPath(endNode);
	}

	// For each neighbour of the current node
	const neighbourCoordinates = [[1, 0], [0, 1], [-1, 0], [0, -1]];
	for (let coordinates of neighbourCoordinates) {

		// Get its coordinates and get the neighbour
		const dx = coordinates[0];
		const dy = coordinates[1];
		const x = astarCurrent.x + dx;
		const y = astarCurrent.y + dy;
		const neighbour = nodes.find(node => node.x === x && node.y === y);

		// If neihbour exists
		if (neighbour) {

			// If neighbour is traversable and not closed
			if (neighbour.traversable && !neighbour.isIn(closedNodes)) {

				// Calculate new h, g and f costs for neighbour
				const new_h_cost = calculateCost(neighbour, endNode);
				const new_g_cost = astarCurrent.g_cost + 10;

				// If neighbour doesn't have or has higher cost, replace with new cost and change neighbour's parent to this
				if (!neighbour.g_cost || neighbour.g_cost + neighbour.h_cost > new_h_cost + new_g_cost) {
					neighbour.h_cost = new_h_cost;
					neighbour.g_cost = new_g_cost;
					neighbour.parent = astarCurrent;
				}

				// If new neighbour is not yet in open, add it to open
				if (!neighbour.isIn(openNodes)) {
					openNodes.push(neighbour);
				}
			}
		}

	}

	// Returns path to a star current
	return getPath(astarCurrent);
}

// Returns the path from node to start node
function getPath(lastnode) {
	const path = [lastnode];
	let current = lastnode;
	while (current.parent) {
		current = current.parent;
		path.push(current);
	}
	return path.reverse();
}