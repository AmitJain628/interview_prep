function frogJump(prices) {
    let dp = Array(prices.length).fill(0);
    dp[0] = 0;

    for (let i =1; i < prices.length; i++) {
        let oneJump = dp[i-1] +  Math.abs(prices[i-1] - prices[i]);
        let twoJump =  i > 1 ? dp[i-2] +  Math.abs(prices[i-2] - prices[i]) : Infinity;
        dp[i] = Math.min(twoJump, oneJump);
    }

    return dp[prices.length-1];
}

function frogJump(prices) {
    let dp = Array(prices.length).fill(0);
  let prev2 = 0;                                          // dp[i‑2]  (dp[0])
  let prev1 = Math.abs(height[1] - height[0]);            // dp[i‑1]  (dp[1])

  for (let i = 2; i < n; i++) {
    const jump1 = prev1 + Math.abs(height[i] - height[i - 1]); // 1‑stair jump
    const jump2 = prev2 + Math.abs(height[i] - height[i - 2]); // 2‑stair jump
    const cur   = Math.min(jump1, jump2);                 // dp[i]

    // slide the two‑value window forward
    prev2 = prev1;
    prev1 = cur;
  }
    return prev1;
}