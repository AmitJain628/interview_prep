function frogJump(prices, jump) {
    const getJump = (index) => {
        if (index === 0) return 0;
        let min = Infinity;
        for (let j =1; j <= jump; j++) {
             if (index - jump >= 0) {
               let val = getJump(index - jump) + Math.abs(arr[index] - arr[index - jump]);
                val = Math.min(min, val)
             }
        }
    }

    return getJump(prices.length);
}

function frogJumpUsingDp(prices, jump) {
    let dp = Array(prices.length).fill(0);
    dp[0] =0;

    for(let i = 1; i < prices.length; i++) {
         for(let j = 1; j <= jump; j++) {
             if(i - j >= 0) {
                dp[i] = Math.min(dp[i], dp[i - j] + Math.abs(prices[i] - prices[i - j]));
             }
         }
    }

    return dp[prices.length - 1];
}
