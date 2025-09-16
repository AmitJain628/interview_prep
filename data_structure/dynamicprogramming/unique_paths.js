
var uniquePaths = function(m, n) {
  let dp = Array(m).fill().map(() => Array(n).fill(0));

  for (let i= 0; i<m; i++) {
    for (let j=0; j<n; j++) {
        if (i ==0 && j == 0) {
            dp[i][j] = 1;
        } else {
          dp[i][j] = (i>0 ? dp[i-1][j] : 0) + (j >0 ? dp[i][j-1] : 0)
        } 
    }
  }

  return dp[m-1][n-1]  
};

  function gridPath(m, n) {
    const getWays = (i, j) => {
      if (i <0 || j <0) return 0;

      if (i == 0 && j == 0) return 1;

      return getWays(i-1, j) + getWays(i, j-1)
    }

    return getWays(m-1, n-1);
  }