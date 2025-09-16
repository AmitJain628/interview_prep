function editDistance(i, j, s1, s2) {
    if (i < 0) return j+1;
    if (j < 0) return i+1;

    if (s1[i] == s2[j]) return editDistance(i-1, j-1, s1, s2);

    return 1 + Math.min(
        editDistance(i, j-1, s1, s2),
        editDistance(i-1, j, s1, s2),
        editDistance(i-1, j-1, s1, s2),
    )
}


var minDistance = function(s1, s2) {
    let m = s1.length;
    let n = s2.length;
    let dp = new Array(m+1)
    for (let i=0; i<=m; i++) {
        dp[i] = Array(n+1).fill(0);
    }

    for(let i=0; i<=m; i++) {
        dp[i][0] = i;
    }
    for(let j=0; j<=n; j++) {
        dp[0][j] = j;
    }

    for(let i= 1; i<=m; i++) {
       for(let j =1; j<=n; j++) {
        if (s1[i-1] == s2[j-1]) {
            dp[i][j] = dp[i-1][j-1];
        } else {
            dp[i][j] = 1 + Math.min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1])
        }
       }
    }
    
    return dp[m][n];
};