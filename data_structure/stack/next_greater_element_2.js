/**
 * @param {number[]} nums
 * @return {number[]}
 */
var nextGreaterElements = function(arr) {
    let stack = [];
    let n = arr.length;
    let res = Array(n).fill(-1);
    for (let i = 2*n-1; i>=0; i--) {
        let ele = arr[i % n];
       while(stack.length > 0 && ele >= stack[stack.length - 1]) {
        stack.pop();
       }
       if (i < n) {
        res[i] =  stack.length > 0 ? stack[stack.length - 1] : -1;
       }

       stack.push(ele);
    }

    return res;
};