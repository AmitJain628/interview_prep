/**
 * O(n × k²) solution.
 * @param {number[][]} costs - n × k matrix
 * @return {number}
 */
function minCostII(costs) {
    const n = costs.length;
    if (n === 0) return 0;
    const k = costs[0].length;
    if (k === 1) return n === 1 ? costs[0][0] : Infinity;
  
    const dp = Array.from({ length: n }, () => Array(k).fill(0));
  
    // base row
    for (let c = 0; c < k; c++) dp[0][c] = costs[0][c];
  
    for (let i = 1; i < n; i++) {
      for (let c = 0; c < k; c++) {
        let bestPrev = Infinity;
        for (let pc = 0; pc < k; pc++) {
          if (pc !== c) bestPrev = Math.min(bestPrev, dp[i - 1][pc]);
        }
        dp[i][c] = costs[i][c] + bestPrev;
      }
    }
  
    return Math.min(...dp[n - 1]);
  }
  