/*
[1,3,5]
[2,2,2,0,1]

*/
function findMinInSortedArrayDuplicatess(arr) { 
    let left = 0;
    let right = arr.length - 1;
    if (arr[left] < arr[right]) {
        return arr[left]
    }
    while(left < right) {
       let mid = Math.floor((left + right)/2);
       console.log("left", left, "right", right, "mid", mid, "mid val", arr[mid], "left val", arr[left], arr[right]);

       if (arr[mid] > arr[right]) {
          left = mid + 1;
       } else if (arr[mid] < arr[right]) {
         right = mid;
       } else {
         right--;
       }
    }

    return arr[left]
}

console.log(findMinInSortedArrayDuplicatess([3,3,1,3]))


var findMin = function(arr) {
  let low = 0;
  let high = arr.length - 1;
  let ans = Infinity;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);

   if (arr[low] === arr[mid] && arr[mid] === arr[high]) {
            low = low + 1;
            high = high - 1;
            ans = Math.min(ans, arr[mid]);
            continue;
    }
    // Check if the middle element is the minimum
    if (arr[mid] <= arr[high]) {
      ans = Math.min(ans, arr[mid]);
      high = mid - 1;  // Search in the left half
    } else {
      ans = Math.min(ans, arr[high]);
      low = mid + 1;  // Search in the right half
    } 
  }

  return ans;
}