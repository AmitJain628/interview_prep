// Time -> O(m*n)
function numIslands(arr) {
    let rows = arr.length;
    let cols = arr[0].length;
    let count = 0;

    if(!arr || arr.length === 0) return 0

    for(let i =0; i < rows; i++) {
        for(let j = 0; j < cols; j++) {
          if(arr[i][j] === "1") {
            count++;
            dfs(arr, i , j); 
          }
        }
    }

    return count
}

function dfs(arr, row, col) {
    if (row < 0 || row >= arr.length || col < 0 || col >= arr[0].length || arr[row][col] === '0') {
        return;
    }

    arr[row][col] = '0';

    dfs(arr, row-1, col);
    dfs(arr, row+1, col);
    dfs(arr, row, col+1);
    dfs(arr, row, col - 1);
}

