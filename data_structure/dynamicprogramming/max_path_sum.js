function maxPathSum(arr) {
    let m = arr.length;
    let n = arr[0].length;

    if (i === 0) return arr[0][j];

    if (i < 0 || j < 0 || j >= m) return -Infinity

    let up = arr[i][j] + maxPathSum(arr, i-1, j);
    let leftDiagonal = arr[i][j] + maxPathSum(arr, i-1, j-1);
    let rightDiagonal = arr[i][j] + maxPathSum(arr, i-1, j+1);

    return Math.max(up, leftDiagonal, rightDiagonal);
}

function maxPathSumusingDp(arr) {
   let m = arr.length;
   let n = arr[0].length;

   let dp = Array(m).fill().map(() => Array(n).fill(0));

   for (let i = 0; i < n; i++) {
      dp[0][i] = arr[0][i]
   }

   for (let i = 1; i < m; i++) {
       for (let j = 0; j< n; j++) {
        let up = arr[i][j] + dp[i-1][j];
        let leftDiagonal =  arr[i][j] + (j > 0 ? dp[i-1][j-1] : -Infinity);
        let rightDiagonal = arr[i][j] + (j < n-1? dp[i-1][j+1] : -Infinity);
        dp[i][j] = Math.max(up, leftDiagonal, rightDiagonal);
       }
   }

   let maxi = Number.MIN_SAFE_INTEGER;
   for (let j = 0; j < n; j++) {
     maxi = Math.max(maxi, dp[m - 1][j]);
   }
 
   return maxi;
}