let grid = [];
let stack = [];
let cols;
let rows;
let size = 20;
let c;          // C for Current cell.

function setup() {

  /** Setup and dimensions. */
  createCanvas(600, 600);
  cols = width / size;
  rows = height / size;

  /** Construct each cell. */
  for (let i = 0; i < cols; i++) {
    grid[i] = [];
    for (let j = 0; j < rows; j++) {
      grid[i][j] = new Cell(i, j)
    }
  }

  /** Initialize first cell. */
  c = grid[0][0];
  c.visited = true;
  stack.push(c);
}

function draw() {

  /** Get all unvisited neighbors to array N for neighbors. */
  N = [];
  if (c.y > 0        && !grid[c.x][c.y - 1].visited) { N.push(grid[c.x][c.y - 1]) }  // Up
  if (c.y < cols - 1 && !grid[c.x][c.y + 1].visited) { N.push(grid[c.x][c.y + 1]) }  // Down
  if (c.x < rows - 1 && !grid[c.x + 1][c.y].visited) { N.push(grid[c.x + 1][c.y]) }  // Right
  if (c.x > 0        && !grid[c.x - 1][c.y].visited) { N.push(grid[c.x - 1][c.y]) }  // Left

  if (stack.length > 0) {
    if (N.length == 0) {

      /** Backtrack when necessary */
      c.backtracked = true;
      c = stack.pop();
      c.backtracked = true;

    } else {

      /** Choose next cell */
      let next = random(N); // Choose random neighbor

      stack.push(c); // Push current to the stack
      if (c.x < next.x) { c.r = false; next.l = false; }  // Remove walls: Right
      if (c.x > next.x) { c.l = false; next.r = false; }  // Remove walls: Left
      if (c.y < next.y) { c.d = false; next.u = false; }  // Remove walls: Down
      if (c.y > next.y) { c.u = false; next.d = false; }  // Remove walls: Up
      c = next;  // Mark next cell as cuurent
      c.visited = true; // Mark it as visited
    }

    /** Draw each cell. */
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        grid[i][j].showCell();
      }
    }
    c.showCurrent();
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        grid[i][j].showWalls();
      }
    }
  }
}