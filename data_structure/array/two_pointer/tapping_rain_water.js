/*

calulate left max height
calculate right max height

get Min of left max height and right max height - current height
*/

function getWater(arr) {
    let leftMax = 0;
    let rightMax = 0;

    let left = 0;
    let right = arr.length - 1;
    let result = 0
    while(left < right) {
         if (arr[left] < arr[right]) {
             if (leftMax < arr[left]) {
                leftMax = arr[left];
             } else {
                result += leftMax - arr[left]
             }
             left++
         } else {
            if (rightMax < arr[right]) {
                rightMax = arr[right];
            } else {
                result += rightMax - arr[right];
            }

            right--;
         }
    }
}