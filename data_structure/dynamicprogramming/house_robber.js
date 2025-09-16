/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function(nums) {
    let n = nums.length;
    let dp = Array(n).fill(0);
    dp[0] = nums[0];
    dp[1] = Math.max(nums[0], nums[1]);


      for (let i = 2; i < n; i++) {
        dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i]);
    }

    return dp[n - 1]; 
};



function houseRubber(nums) {
   
     const getMax = (index) => {
         if ( index<0) return 0;
         if (index === 0) return nums[0];

         first = (getMax(index-2) + nums[index]) 
         second = getIndex(index - 1)

         Math.max(first, second);
     }
}