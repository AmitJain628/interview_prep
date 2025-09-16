/**
 * @param {number[][]} heights
 * @return {number[][]}
 */
var pacificAtlantic = function(heights) {
    let pacificGrid = [];
    let atlanticGrid = [];
    let rows = heights.length;
    let cols = heights[0].length;
    let result = [];
 
    for (let i=0; i<rows; i++) {
     for (let j =0; j<cols; j++) {
         if(!pacificGrid[i]) {pacificGrid[i] = []}
         if(!atlanticGrid[i]) {atlanticGrid[i] = []}
         pacificGrid[i][j] = false;
         atlanticGrid[i][j] = false;
     }
    }
 
    for(let i=0; i<rows; i++) {
     dfs(i, 0, pacificGrid, heights); // left border
     dfs(i, cols-1, atlanticGrid, heights); // right border
    }
 
    for(let i=0; i<cols; i++) {
         dfs(0, i, pacificGrid, heights); // top row
         dfs(rows-1 , i, atlanticGrid, heights); // botom row
    }
 
 for (let i=0; i<rows; i++) {
     for (let j =0; j<cols; j++) {
         if(pacificGrid[i][j] && atlanticGrid[i][j]) {
             result.push([i, j])
         }
     }
    }
 
    return result;
 
 }
 
 function dfs(row, col, grid, height) {
    grid[row][col] = true
    let directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    for (let [x, y] of directions) {
     let newRow = x + row;
     let newCol = y + col;
 
    if (newRow < 0 || newCol < 0 || newRow >= grid.length || newCol >= grid[0].length) {
      continue;
    }
 
    if (grid[newRow][newCol]) {
      continue;
    }
 
    if(height[newRow][newCol] < height[row][col]) continue;
 
    dfs(newRow, newCol, grid, height);
    }
 
    }
 
 