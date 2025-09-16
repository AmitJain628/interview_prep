/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var solve = function(arr) {
    let rows = arr.length;
    let cols = arr[0].length;

    // left border and right border
    for (let i = 0; i< rows; i++) {
        dfs(arr, i, 0);
        dfs(arr, i, cols-1);
    }

    // top border and bottom border
    for (let j = 0; j < cols; j++) {
          dfs(arr, 0, j);
          dfs(arr, rows-1, j);
    }

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
     //       console.log("arr", arr[i][j], arr[i][j] === "O")
            if (arr[i][j] === "O") {
                 arr[i][j] = "X"
             } else if (arr[i][j] === "S") {
                arr[i][j] = "O"
             }
            }
        }

    return arr;
};


function dfs(arr, i, j) {
    if (i < 0 || j < 0 || i >= arr.length || j >= arr[0].length || arr[i][j] !== 'O') {
        return;
    }

    arr[i][j] = 'S';

    dfs(arr, i+1, j);
    dfs(arr, i-1, j);
    dfs(arr, i, j+1);
    dfs(arr, i, j-1);
}