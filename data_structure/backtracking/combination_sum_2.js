function combinationSum(arr, target) {
    let result = [];
    arr.sort((a, b) => a - b); 

    const backtrack = (start, target, combinations) => {
        if (target === 0) {
            result.push([...combinations]);
            return;
        }

        for (let i = start; i<arr.length; i++) {
            if (i > start && arr[i] === arr[i - 1]) continue;
            if (arr[i] > target) continue;
            combinations.push(arr[i]);
            backtrack(i+1, target - arr[i], combinations);
            combinations.pop();
        }
    }

    backtrack(0, target, combinations);
    return result;
}