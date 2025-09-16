/**
 * @param {number[]} nums
 * @return {boolean}
 */
var containsDuplicate = function(nums) {
    let hash ={};
    for(let i=0; i<nums.length; i++) {
        if(typeof hash[nums[i]] === "undefined") {
            hash[nums[i]] = 1;
        } else {
            return true;
        }
    }
    
    return false;
};