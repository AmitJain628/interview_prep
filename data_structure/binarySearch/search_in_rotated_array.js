/*
Input: nums = [4,5,6,7,0,1,2], target = 0
Output: 4

mid = 3 arr[mid] = 7

left = 4 right = 6 mid = 5 arr[mid] = 1
*/

function search(arr, target) {
    let left=0;
    let right = arr.length - 1;

    while(left <= right) {
        let mid  = Math.floor((left+right)/2);

        console.log("left", left, "right", right, "mid", mid, "mid val", arr[mid], "left val", arr[left], arr[right]);
        if (arr[mid] === target) {
            return mid;
        }

        if (arr[left] <= arr[mid]) {
            if ((target < arr[mid] && target >= arr[left])) {
                right = mid - 1
            } else {
                left = mid + 1;
            }
        } else {
            if (target > arr[mid] && target <= arr[right]) {
                left = mid + 1
            } else {
                right = mid - 1;
            }
        }
    }

    return -1;
}

console.log(search([4, 5,  6,  7,    0,  1,   2], 0)); // 4
                            //    mid          right