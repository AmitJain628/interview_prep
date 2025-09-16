function nearestSmallest(arr) {
    let n = arr.length
    let res = Array(n).fill(-1);
    let stack = [];

    for (let i =0; i< n; i++) {
         while(stack.length > 0 && stack[stack.length] >= arr[i]) {
            stack.pop();
         }

         if (stack.length > 0) {
            res[i] = stack[stack.length - 1];
         }

         stack.push(arr[i]);
    }

    return res;
}