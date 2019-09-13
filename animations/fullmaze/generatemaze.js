
const mazeStack = [];
let mazeCurrent;
let mazeCells;
let mazeInitialized = false;

// Initializes stack, cells and node cell properties before generating maze
function initializeMazeGeneration() {

	// Dimensions have to be odd by odd, else break and mark initialized as false
	if (cols % 2 === 0 || rows % 2 === 0) {
		console.log("Dimensions have to be ood");
		mazeInitialized = false;
		return;
	}

	// Set flags
	generatingMaze = true;
	pathFinding = false;

	// Generate cell functionality for "checkered nodes"
	nodes.forEach(n => n.generateCellProperties());

	// Get all cells with cell properties
	mazeCells = nodes.filter(n => n.hasCellProperties);

	// Initialize first cell
	mazeCurrent = startNode;
	mazeCurrent.visited = true;
	mazeStack.push(mazeCurrent);

	// If succesful mark maze initialized to true
	mazeInitialized = true;
}

// Performs a single step of the maze generation algorithm
function generateMazeStep() {

	// If maze is not initialized, don't touch it
	if (!mazeInitialized) return false;

	// Get all unvisited neighbors
	const neighbors = [];

	// Try to find all neighbours
	const neighbor_u = mazeCells.find(c => c.cellX === mazeCurrent.cellX && c.cellY === mazeCurrent.cellY - 1);
	const neighbor_d = mazeCells.find(c => c.cellX === mazeCurrent.cellX && c.cellY === mazeCurrent.cellY + 1);
	const neighbor_l = mazeCells.find(c => c.cellX === mazeCurrent.cellX - 1 && c.cellY === mazeCurrent.cellY);
	const neighbor_r = mazeCells.find(c => c.cellX === mazeCurrent.cellX + 1 && c.cellY === mazeCurrent.cellY);

	// Push existing and non-visited neighbour to array of possible neighbours
	if (neighbor_u && !neighbor_u.visited) neighbors.push(neighbor_u);
	if (neighbor_d && !neighbor_d.visited) neighbors.push(neighbor_d);
	if (neighbor_l && !neighbor_l.visited) neighbors.push(neighbor_l);
	if (neighbor_r && !neighbor_r.visited) neighbors.push(neighbor_r);

	// While there are items in the stack keep generating maze
	if (mazeStack.length > 0) {

		// If there are no neighbors, mark all neighbors backtracked and pop stack
		if (neighbors.length === 0) {
			mazeCurrent.cellBacktracked = true;
			mazeCurrent = mazeStack.pop();
			mazeCurrent.cellBacktracked = true;
			[[1, 0], [0, 1], [-1, 0], [0, -1]].forEach(c => {
				nodes.find(n => n.x === mazeCurrent.x + c[0] && n.y === mazeCurrent.y + c[1]).cellBacktracked = true;
			});
		}

		else {

			// Pick a random neighbor as next cell
			let next = random(neighbors);
			mazeStack.push(mazeCurrent);

			// Get vector from mazeCurrent cell to next cell
			let dx = next.cellX - mazeCurrent.cellX;
			let dy = next.cellY - mazeCurrent.cellY;

			// Make node between cells traversable
			let inbetween = nodes.find(n => n.x === mazeCurrent.x + dx && n.y === mazeCurrent.y + dy);
			inbetween.traversable = true;
			fill(255, 0, 0);
			rect(inbetween.x * size, inbetween.y * size, size, size);

			// Set next cell as mazeCurrent cell
			mazeCurrent = next;
			mazeCurrent.visited = true;
		}

		// Return false to indicate non completed maze
		return false;
	}

	// If stack is empty, return false to indicate completed maze
	return true;
}