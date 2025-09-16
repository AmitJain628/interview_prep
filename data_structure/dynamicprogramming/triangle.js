function triangle(arr) {
    let n = arr.length;
    let dp = Array(n).fill(0).map(() => Array(n).fill(0));

    for(let i=0; i< arr[n-1].length; i++) {
        dp[n-1][i] = arr[n-1][i];
    }

    for(let i=n-2; i>=0; i--) {
        for(let j=0; j<=i; j++) {
            dp[i][j] = Math.min(dp[i+1][j] + arr[i][j], dp[i+1][j+1] + arr[i][j]);
        }
    }

    return dp[0][0];
}