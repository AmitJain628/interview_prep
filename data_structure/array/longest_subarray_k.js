/*
Input: arr[] = [2, 7, 6, 1, 4, 5], k = 3
Output: 4
Explanation: The subarray [7, 6, 1, 4] has sum = 18, which is divisible by 3.
*/

function longestSubarryK(arr, k) {
  let map = new Map();
  let prefixSum = 0;

  let res = 0;
  for (let i = 0; i< arr.length; i++) {
      prefixSum += arr[i];
     let mod = prefixSum % k;
     if (prefixSum === 0) {
         res = Math.max(res, i + 1)
     }
     else if (map.has(mod)) {
          res = Math.max(res, i - map.get(mod));
      } else {
        map.set(mod, i)
      }
  }

  return res;
}