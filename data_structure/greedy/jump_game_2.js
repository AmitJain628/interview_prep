/**
 * @param {number[]} nums
 * @return {number}
 */
var jump = function(nums) {
    
    if(nums.length <= 1) return 0;
    
    let jump = 0;
    let end = 0;
    let maxSoFar = 0;

    for (let i =0; i< nums.length-1; i++) {
        maxSoFar = Math.max(maxSoFar, i + nums[i]);

        if (i === end) {
            jump++;
            end = maxSoFar
        }
    }

    return jump;  
};