function minCode(costs) {
    let n = costs.length;

    let m = costs[0].length;
    let dp = [];
    for(let i=0; i<n; i++) {
        dp[i] = new Array(m).fill(0);
    }

    dp[0][0] = costs[0][0];
    dp[0][1] = costs[0][1];
    dp[0][2] = costs[0][2];
    dp[0][3] = costs[0][3];

    for(let i=1; i<n;i++) {
        dp[i][0] = costs[i][0] + Math.min(dp[i - 1][1], dp[i - 1][2]); // red
        dp[i][1] = costs[i][1] + Math.min(dp[i - 1][0], dp[i - 1][2]); // blue
        dp[i][2] = costs[i][2] + Math.min(dp[i - 1][0], dp[i - 1][1]); 
    }

    return Math.min(dp[n - 1][0], dp[n - 1][1], dp[n - 1][2]);

}