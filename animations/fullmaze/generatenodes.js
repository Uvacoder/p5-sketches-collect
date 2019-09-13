
// Function that takes dimensions and two indices and populates and returns an array with nodes and references to special nodes
function generateNodes(startingX, startingY, endingX, endingY) {

	// Set up variable for saving the starting and node
	let newNodes = [];
	let newStartNode;
	let newEndNode;

	const startingIndex = startingX + startingY * cols;
	const endingIndex = endingX + endingY * cols;

	// Loop through each node and generate it into empty array
	for (let i = 0; i < cols * rows; i++) {

		// Get cell location
		let row = floor(i / cols);
		let col = floor(i % cols);

		// Get cell properties
		let start = (i === startingIndex);
		let end = (i === endingIndex);
		let index = i;

		// Create node
		let node = new Node(col, row, index, {
			start, end
		});

		// Save node to array and save starting and ending nodes
		newNodes[i] = node;
		if (start) {
			newStartNode = node;
			node.makeStartingNode();
		} else if (end) {
			newEndNode = node;
			node.makeEndingNode();
		}
	}

	// Set up start node cost properties
	newStartNode.g_cost = 0;
	newStartNode.h_cost = calculateCost(newStartNode, newEndNode);

	// Create all nodes
	return { newNodes, newStartNode, newEndNode };
}