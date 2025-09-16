/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function(nums) {
    if (nums.length === 0) return 0;
    if (nums.length === 1) return nums[0];

    // Helper function to solve House Robber I using DP array
    const robLinear = (houses) => {
        let n = houses.length;
        if (n === 0) return 0;
        if (n === 1) return houses[0];

        let dp = new Array(n).fill(0);
        dp[0] = houses[0];
        dp[1] = Math.max(houses[0], houses[1]);

        for (let i = 2; i < n; i++) {
            dp[i] = Math.max(dp[i - 1], dp[i - 2] + houses[i]);
        }
        return dp[n - 1];
    };

    return Math.max(robLinear(nums.slice(0, -1)), robLinear(nums.slice(1)));
};