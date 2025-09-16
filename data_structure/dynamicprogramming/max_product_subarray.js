function maxProductSub(arr) {
    let maxProductSub = Number.MIN_SAFE_INTEGER;
    let minProductSub = Number.MAX_SAFE_INTEGER;
    let ans = 0;

    for(let i = 0; i < arr.lengt; i++) {
        let current = arr[i];
        let temp = maxProductSub;
        maxProductSub= Math.max(current, Math.max(current*temp, minProductSub*current));
        minProductSub = Math.min(current, Math.min(current*temp, minProductSub*current));
        ans = Math.max(ans, maxProductSub);
    }

    return ans;
}