/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permuteUnique = function(nums) {
    let result = [];
    nums = nums.sort((a,b) => a -b);

    const backtrack = (path, used) => {
        if (path.length === nums.length) {
            result.push([...path])
        }

        for(let i=0; i<nums.length;i++) {
            if(used[i]) continue;
            if (i > 0 && nums[i] === nums[i - 1] && !used[i - 1]) continue; 
            path.push(nums[i]);
            used[i] = true;
            backtrack(path, used)
            path.pop();
            used[i] = false;
        }
    }

    backtrack([], new Array(nums.length).fill(false));

    return result;
};