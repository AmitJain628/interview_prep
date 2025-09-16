var sumSubarrayMins = function(arr) {
    function nextSmaller(arr) {
      let stack = [];
      let res = Array(arr.length).fill(arr.length);
    
      for(let i = 0; i < arr.length; i++){
        while(stack.length >0 && arr[stack[stack.length - 1]] >= arr[i]) {
            let index = stack.pop();
            res[index] = i;
        }
    
        stack.push(i);
      }
        return res;
    
    }
    
    function previousSmaller(arr) {
    let stack = [];
      let res = Array(arr.length).fill(-1);
    
      for(let i = 0; i < arr.length; i++){
        while(stack.length > 0 && arr[stack[stack.length - 1]] >= arr[i]) {
            stack.pop();
        }
    
        if (stack.length>0){
            res[i] = stack[stack.length - 1];
        }
    
        stack.push(i);
      }
    
      return res;
    }
    
    let next = nextSmaller(arr);
    let prev = previousSmaller(arr);
    let total = 0;
    console.log(next, prev)
    const MOD = 1e9+7;
    for (let i =0; i< arr.length; i++) {
        let leftCount = i - prev[i];
        let rightCount = next[i] - i;
        total = (total + ((leftCount) * (rightCount) * arr[i])) % MOD;
    }
    
    return total;
    }