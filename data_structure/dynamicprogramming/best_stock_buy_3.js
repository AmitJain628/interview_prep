/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    const getProfit = (index, allowBuy, cap) => {
        if (index >= prices.length) return 0;
        if (cap == 0) return 0;

        if (allowBuy) {
          const buy = -prices[index] + getProfit(index+1, 0, cap);
          const skip = 0 + getProfit(index+1, 1, cap);
          return Math.max(buy, skip);
        } else {
          const sell = prices[index] + getProfit(index+1, 1, cap-1);
          const skip = 0 + getProfit(index+1, 0, cap);
          return Math.max(sell, skip);
        }
    }

    return getProfit(0, 1, 2);
};


var maxProfit = function(prices) {
  let n = prices.length;
  let dp = Array(n+1).fill().map(() => Array(2).fill().map(() => Array(3).fill(0)));

  for(let index = n-1; index>=0; index--) {
      for (let buy=0; buy<=1; buy++) {
          for(let cap=1; cap<=2; cap++) {
          if (buy) {
              const buyprofit = -prices[index] + dp[index+1][0][cap];
              const skip = 0 + dp[index+1][1][cap];
              dp[index][buy][cap] = Math.max(buyprofit, skip);
          } else {
              const sell = prices[index] + dp[index+1][1][cap-1];
              const skip = 0 + dp[index+1][0][cap];
              dp[index][buy][cap] = Math.max(sell, skip);
           }
          }
      }
  }
  
  return dp[0][1][2]
};