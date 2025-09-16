function combinationSum(arr, target) {
   let result = [];

   const backtrack = (start, target, combination) => {
      
    if (target === 0) {
        result.push([...combination]);
        return;
    }
    for (let i = start; i< arr.length; i++) {
        if (arr[i] > target) continue;
        combination.push(arr[i]);
        backtrack(i, target-arr[i], combination);
        combination.pop();
    }
   }


   
    backtrack(0, target, []);

    return result;
}