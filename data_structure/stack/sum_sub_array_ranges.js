/**
 * @param {number[]} nums
 * @return {number}
 */
var subArrayRanges = function(nums) {
    function nextSmallerElement(arr) {
       let stack = [];
       let res = new Array(arr.length).fill(arr.length); // Default to out of bounds
       for (let i = 0; i < arr.length; i++) {
           while (stack.length > 0 && arr[stack[stack.length - 1]] >= arr[i]) {
               let index = stack.pop();
               res[index] = i;
           }
           stack.push(i);
       }
       return res;
    }

    function prevSmallerElement(arr) {
       let stack = [];
       let res = new Array(arr.length).fill(-1); // Default to out of bounds
       for (let i = 0; i < arr.length; i++) {
           while (stack.length > 0 && arr[stack[stack.length - 1]] >= arr[i]) {
               stack.pop();
           }
           if (stack.length > 0) {
               res[i] = stack[stack.length - 1];
           }
           stack.push(i);
       }
       return res;
    }

    function nextLargerElement(arr) {
        let stack = [];
        let res = new Array(arr.length).fill(arr.length); // Default to out of bounds
        for (let i = 0; i < arr.length; i++) {
            while (stack.length > 0 && arr[stack[stack.length - 1]] <= arr[i]) {
               let index = stack.pop();
               res[index] = i;
            }
            stack.push(i);
        }
        return res;
    }

    function prevLargerElement(arr) {
        let stack = [];
        let res = new Array(arr.length).fill(-1); // Default to out of bounds
        for (let i = 0; i < arr.length; i++) {
            while (stack.length > 0 && arr[stack[stack.length - 1]] <= arr[i]) {
               stack.pop();
            }
            if (stack.length > 0) {
                res[i] = stack[stack.length - 1];
            }
            stack.push(i);
        }
        return res;
    }

    // Calculate next/previous smaller/larger elements
    let rightSmaller = nextSmallerElement(nums);
    let leftSmaller = prevSmallerElement(nums);
    let rightLarger = nextLargerElement(nums);
    let leftLarger = prevLargerElement(nums);

    // console.log("nextSmallerElelement", rightSmaller);
    // console.log("prevSmallerElement", leftSmaller);
    // console.log("nextLarger", rightLarger);
    // console.log("prevLarger", leftLarger);
    // Sum of all subarray ranges
    let sum = 0;

    for (let i = 0; i < nums.length; i++) {
        let leftMin = i - leftSmaller[i];
        let rightMin = rightSmaller[i] - i;

        let leftMax = i - leftLarger[i];
        let rightMax = rightLarger[i] - i;
        
        sum += nums[i] * (leftMax * rightMax - leftMin * rightMin);
    }

    return sum;
};