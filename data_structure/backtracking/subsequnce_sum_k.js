function printSubsequencesWithSumK(nums, k) {
    let result = [];

    function backtrack(index, path, sum) {
        // Base case: if the sum equals k, store the subsequence
        if (sum === k) {
            result.push([...path]);
        }

        // Explore further elements
        for (let i = index; i < nums.length; i++) {
            path.push(nums[i]); // Include current element
            backtrack(i + 1, path, sum + nums[i]); // Recur for next index
            path.pop(); // Exclude the last element (backtrack)
        }
    }

    backtrack(0, [], 0);
    return result;
}

// Example usage
let nums = [1, 2, 3, 4, 5];
let k = 5;
console.log(printSubsequencesWithSumK(nums, k));
