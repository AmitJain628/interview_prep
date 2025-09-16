/*
Input: numbers = [2,7,11,15], target = 9
Output: [1,2]
*/
function twoSum(arr, target) {
   let i =0;
   let j = arr.length - 1;

   while(i < j) {
      let sum = arr[i] + arr[j];

      if (sum === target) {
         return [i, j];
      }

      if (sum > target) {
         j--;
      } else {
        i++
      }
   }

   return [];
}