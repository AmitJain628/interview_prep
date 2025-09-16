/**
 * @param {number[]} candies
 * @param {number} k
 * @return {number}
 */
var maximumCandies = function(candies, k) {

    function canAllocate(num) {
        let counter = 0;
        for (let cand of candies) {
            counter += Math.floor(cand/num)
        }
        return counter >= k;
    }

    let left = 1;
    let right = 1;

    for (pile of candies) {
        right = Math.max(pile, right)
    }
    let ans = 0;

    
    while(left <= right) {
        let mid = Math.floor((left + right)/2);
    //console.log("left", left, "right", right, "mid", mid, canAllocate(mid) )
        if (canAllocate(mid)) {
            ans = mid;
            left = mid+1
        } else {
             right = mid -1
        }
    }

    return ans;
};
