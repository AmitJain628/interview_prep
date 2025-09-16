let arr = [4, 5, 2, 10, 8];
function nextGreaterElement(arr) {
    let res = Array(arr.length).fill(-1);
    let stack = [];
    for (let i = n - 1; i >= 0; i--) {
        while (stack.length > 0 && stack[stack.length - 1] <= arr[i]) {
            stack.pop();
        }
        
        if (stack.length > 0) {
            result[i] = stack[stack.length - 1];
        }
        
        stack.push(arr[i]);
    }

    return result;
}

/*
stack -> [8]

*/