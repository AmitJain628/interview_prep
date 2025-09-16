function decodeWays(str) {
    let n = str.length;
    if(str === null || str[0] === '0') return 0;
    let dp = new Array(n+1).fill(0);
    dp[0] = 1; // empty string
    dp[1] = 1; // if length is 1

    for (let i = 2; i <= n; i++) {
           let onedigit = str[i -1];
           let twoDigit = str[i - 2] + str[i -1];
           if (onedigit > '0' && onedigit <= '9') {
              dp[i] += dp[i - 1];
           }

           if (twoDigit >= '10' && twoDigit <= '26') {
              dp[i] += dp[i - 2];
           }
    }

    return dp[n];
}

/*
2 -> 1
29 -> 2
226 -> 3
2269 ->
226 -> 
2 -> 1
2 -> 1, 1
6 -> 1  1 
*/