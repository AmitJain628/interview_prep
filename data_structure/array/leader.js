Input: arr = [16, 17, 4, 3, 5, 2]
Output: [17, 5, 2]
function leader(arr) {
  let res = [];

  for(let i=arr.length - 1; i>= 0; i--) {
     while(stack.length !== 0 && stack[stack.length - 1] < arr[i]) {
        stack.pop();
     }

     if (stack.length === 0) {
        res.push(arr[i]);
     }
  }

  return res;
}