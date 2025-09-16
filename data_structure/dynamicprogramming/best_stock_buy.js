// /**
//  * @param {number[]} prices
//  * @return {number}
//  */
// var maxProfit = function(prices) {
//     const getProfit = (index, isBuy) => {
//          if (index >= prices.length) return 0;
//          if (isBuy) {
//             const buy = -prices[index] + getProfit(index+1, 0);
//             const skip = 0 + getProfit(index+1, 1);
//             return Math.max(buy, skip);
//          } else {
//             const sell = prices[index] + getProfit(index+1, 1);
//             const skip = 0 + getProfit(index+1, 0);
//             return Math.max(sell, skip);
//          }
//     }
//     return getProfit(0, 1);
// };

/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    let n = prices.length;
    let dp = Array(n + 1).fill(0).map(() => Array(2).fill(0));
     for (let index = n - 1; index >= 0; index--) {
        for (let isBuy = 0; isBuy <= 1; isBuy++) {
            if (isBuy) {
                dp[index][isBuy] = Math.max(-prices[index] + dp[index + 1][0], dp[index + 1][1]);
            } else {
                dp[index][isBuy] = Math.max(prices[index] + dp[index + 1][1], dp[index + 1][0]);
            }
        }
    }

  return dp[0][1];

};