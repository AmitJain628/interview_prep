function distinctIsland(arr) {
    let rows  = arr.length;
    let cols = arr[0].length;
    let island = new Set();
    
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (arr[i][j] === 1) {
                let shape = []
                dfs(arr, i, j, i, j, shape);
                console.log("shape: " + shape)
                island.add(JSON.stringify(shape));
            }
        }
    }


    function dfs(arr, i, j, baseX, baseY, shape) {
        if (i < 0 || i >= arr.length || j < 0 || j >= arr[0].length || arr[i][j] === 0) {
            return;
       }

       shape.push([i - baseX, j - baseY]);
       console.log(",", i, j, baseX, baseY)
       arr[i][j] = 0;

       dfs(arr, i + 1 , j, baseX, baseY, shape);
       dfs(arr, i - 1, j, baseX, baseY, shape);
       dfs(arr, i, j + 1, baseX, baseY, shape);
       dfs(arr, i, j - 1, baseX, baseY, shape);
    }

    return island.size;
}

let grid1 = [
    [1, 1, 0, 0, 0],
    [1, 1, 0, 0, 0],
    [0, 0, 0, 1, 1],
    [0, 0, 0, 1, 1]
];

console.log(distinctIsland(grid1)); // Output: 2