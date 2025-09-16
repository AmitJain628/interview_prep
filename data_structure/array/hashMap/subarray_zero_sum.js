function subArrayZeroSum(arr) {
    let hash = {};
    let sum = 0;
    let max = -Infinity;
    for(let i=0; i<arr.length; i++) {
        sum += arr[i];

        if (sum === 0) {
            max = i + 1;
        }

        if(typeof hash[sum] !== 'undefined') {
             max = Math.max(max, i - hash[sum]);
        } else {
            hash[sum] = i;
        }
    }

    return max;
}