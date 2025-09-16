function maxAreaIsland(arr) {
    let rows = arr.length;
    let cols = arr[0].length;

    let maxArea = 0;
    let directions = [[1,0], [-1, 0], [0,1], [-1, 0]];

    const bfs = (arr, i, j) => {
        let queue = [[i, j]];
        arr[i][j] = 0;
        let area = 0;
        while(queue.length) {
          const [i, j]  = queue.shift();
          area++;

          for (let [x, y] of directions) {
            let newX = x + i;
            let newY = y + j;

            if (newX >= 0 && newY >= 0 && newX < rows && newY < cols && arr[newX][newY] === 1) {
                 queue.push([newX, newY]);
                 arr[newX][newY] = 0;
            }
          }
        }

        return area;
    }

    for(let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (arr[i][j] === 1) {
                maxArea = Math.max(maxArea, bfs(arr, i, j));
            }
        }
    }

    return maxArea;
}

