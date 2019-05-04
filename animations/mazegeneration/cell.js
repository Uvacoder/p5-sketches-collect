/** A cell class, constructed with a integer coordinate pair. */
class Cell {
    constructor(x, y) {
  
      /** A Cell contains its position in the grid */
      this.x = x;
      this.y = y;
  
      /** A Cell contains its 4 walls */
      this.u = true;
      this.d = true;
      this.l = true;
      this.r = true;
  
      /** A Cell contains its status */
      this.visited = false;
      this.backtracked = false;
  
      /** x0, y0 are the left top corner canvas coordinates,
       *  x1, y1 are the right bottom corner canvas coordinates */
      this.x0 = this.x * size;
      this.y0 = this.y * size;
      this.x1 = (this.x + 1) * size;
      this.y1 = (this.y + 1) * size;
    }
    
    /** Function to show each cell. */
    showCell() {
      noStroke();
      if (this.backtracked) { fill(255); }
      else if (this.visited) { fill(150); }
      else { fill(50); }
      rect(this.x0, this.y0, size, size);
    }

    /** Function to show current cell differently. */
    showCurrent() {
        noStroke();
        fill(255, 0, 0);
        rect(this.x0, this.y0, size, size);
    }
    
    /** Function to show walls of each cell. */
    showWalls() {
      stroke(0);
      strokeWeight(10);
      if (this.u) { line(this.x0, this.y0, this.x1, this.y0); }
      if (this.d) { line(this.x0, this.y1, this.x1, this.y1); }
      if (this.l) { line(this.x0, this.y0, this.x0, this.y1); }
      if (this.r) { line(this.x1, this.y0, this.x1, this.y1); }
    }
  }