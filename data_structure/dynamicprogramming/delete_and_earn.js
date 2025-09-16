/**
 * @param {number[]} nums
 * @return {number}
 */
var deleteAndEarn = function(nums) {
    let freq = new Map();
    for (let num of nums) {
        freq.set(num, (freq.get(num) || 0) + 1)
    }
    nums.sort((a,b) => a - b);
    let arr = [...new Set(nums)];

    let dp = Array(arr.length).fill(0);
    dp[0] = freq.get(arr[0]) * arr[0];
    for(let i=1; i<arr.length; i++) {
        let points = freq.get(arr[i]) * arr[i];
        if (arr[i] - 1 == arr[i-1]) {
            let take = i>1 ? (dp[i-2]) : 0
            take += points;
            let skip = dp[i-1];
            dp[i] = Math.max(take, skip);
        } else {
            dp[i] = dp[i-1] + points;
        }
    }
    return dp[arr.length -1]
};