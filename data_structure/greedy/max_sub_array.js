/*
Kadane's Algorithm

*/
function maxSubArray(arr) {
  let currentSum = 0;
  let maxSum = 0;
  let start = 0;
  let end = 0;
  let tempStart = 0;

  for (let i =0; i < arr.length; i++) {
    if (arr[i] > (currentSum + arr[i])) {
        currentSum = arr[i];
        tempStart = i;
    } else {
        currentSum += arr[i];
    }

    if (maxSum < currentSum) {
        maxSum = currentSum;
        start = tempStart;
        end = i;
    }
  }

  return maxSum;

}