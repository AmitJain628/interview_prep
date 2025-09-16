/**
 * @param {number[]} position
 * @param {number} m
 * @return {number}
 */
var maxDistance = function(arr, m) {
    arr = arr.sort((a, b) => a -b);

    function canArrange(min) {
      let lastIndex = 0;
      let count=1;
      for (let i=1; i<arr.length; i++) {
          if (arr[i] - arr[lastIndex] >= min) {
              lastIndex = i;
               count++;
          }
      }

      return count >= m
    }

    let left = 1;
    let right = arr[arr.length - 1] - arr[0];
    let ans = 1;

    while(left <= right) {
      let mid = Math.floor((left + right)/2);
      if (canArrange(mid)) {
            ans = mid;
            left = mid + 1;
      } else {
            right = mid - 1;
      }
    }

    return ans;
};