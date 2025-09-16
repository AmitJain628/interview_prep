var orangesRotting = function(grid) {
    let rows = grid.length;
    let cols = grid[0].length;
    let freshCount = 0;

    let  queue = [];


    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
              if (arr[i][j] === 2) {
                queue.push([i, j, 0]);
              } else if(arr[i][j] === 1) {
                freshCount++;
              }
        }
    }

    if(freshCount) return -1;

    let directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    let minutes = 0;

    while(queue.length) {
        let [row, col, time] = queue.shift();
        minutes = Math.max(minutes, time);

        for (let [x,y] of directions) {
            let newRow = x + row;
            let newCol = y + col;

            if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols && arr[newRow][newCol] === 1) {
                arr[newRow][newCol] = 2;
                freshCount--;
                queue.push([newRow, newCol, time + 1]);
            }
        }

    }

    return freshCount === 0 ? -1 : minutes;
    
};

