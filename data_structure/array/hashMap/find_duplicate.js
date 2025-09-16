/*
Input: nums = [1,3,4,2,2]
Output: 2
*/

function hasDuplicates(arr) {
    for (let i = 0; i < arr.length; i++) {
        if(arr[Math.abs(arr[i])] > 0) {
            arr[Math.abs(arr[i])] *= -1;
        } else {
           return Math.abs(arr[i]);
        }
    }
}