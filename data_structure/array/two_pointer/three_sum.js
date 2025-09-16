/*

Input: nums = [-1,0,1,2,-1,-4]
Output: [[-1,-1,2],[-1,0,1]]

*/

function threeSum(nums) {
   nums = nums.sort((a, b) => a - b);
   let result = 0;
   for (let i = 0; i < nums.length; i++) {
        if( i > 0 && arr[i] == arr[i-1]) continue;

        let left = i + 1;
        let right = nums.length - i;

        while (left < right) {
            let sum = nums[i] + nums[left] + nums[right];

            if (sum === 0) {
               result.push([nums[i], nums[left], nums[right]]);
               while(left < right && nums[left] === nums[left+1]) {
                   left++;
               }
               while(left < right && nums[right] === nums[right-1]) {
                  right--;
                }
            } else if (sum >0) {
                right--;
            } else {
                left++;
            } 
        }
   }

   return result;
}