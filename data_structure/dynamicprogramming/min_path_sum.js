function minimumPathSum(arr) {
    const get = (arr, i, j) => {
    
        if (i==0 && j==0) return arr[i][j];

        if (i < 0 || j < 0) return Infinity

        let up = arr[i][j] + get(arr, i, j-1)
        let down = arr[i][j] + get(arr, i-1, j)
        return Math.min(up, down)
    }

    return get(arr, arr.length-1, arr[0].length-1)
}
/**
 * @param {number[][]} grid
 * @return {number}
 */
var minPathSum = function(arr) {
    let n = arr.length;
    let m = arr[0].length;
    const dp = new Array(n).fill(null).map(() => new Array(m).fill(0));

  // Initialize the starting cell
  dp[0][0] = arr[0][0];

  // Fill the first row (can only come from left)
  for (let j = 1; j < m; j++) {
    dp[0][j] = dp[0][j - 1] + arr[0][j];
  }

  // Fill the first column (can only come from above)
  for (let i = 1; i < n; i++) {
    dp[i][0] = dp[i - 1][0] + arr[i][0];
  }

  // Fill the DP table using the min path sum formula
  for (let i = 1; i < n; i++) {
    for (let j = 1; j < m; j++) {
      dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + arr[i][j];
    }
  }

  // Return the minimum path sum at the bottom-right corner
  return dp[n - 1][m - 1];
};

/**
 * @param {number[][]} obstacleGrid
 * @return {number}
 */
var minPathSum = function(arr) {
  let m = arr.length;
  let n = arr[0].length;
  let dp = Array(m).fill().map(() => Array(n).fill(0));

  for(let i=0; i<m; i++) {
      for (let j=0; j<n; j++) {
         if (i == 0 && j ==0) {
            dp[i][j] = arr[i][j];
         } else {
          let up = arr[i][j], left = arr[i][j];
          if (i > 0) { up += dp[i-1][j] }  else up = Infinity;
          if (j > 0) {left += dp[i][j-1]; }else left = Infinity;
          dp[i][j] = Math.min(up, left);
         }
      }
  }

  return dp[m-1][n-1]
};