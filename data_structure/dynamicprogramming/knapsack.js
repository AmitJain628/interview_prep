function knapSack(ind, w, weightArr, value) {
    if (ind === 0) {
          if(weightArr[0] < w) return value[0];
          return 0
    }
    
    let notTake = knapSack(ind - 1, w, weightArr, value);
    let take = -Infinity;
    if (weightArr[ind] <= w) {
        take = value[ind] + knapSack(ind-1, w - weightArr[ind], weightArr, value);
    }

    return Math.max(notTake, take); 
}

const weights = [1, 3, 4, 5];
const values = [10, 40, 50, 70];
const capacity = 8;
const n = weights.length;



function usingDP() {
    let dp = new Array(n);
    for(let i=0; i<n;i++) {
        dp[i] = Array(capacity+1).fill(0);
    }

    //base case
    for (let w = 0; w <= capacity; w++) {
        if (weights[0] <= w) {
            dp[0][w] = values[0];
        }
    }

    for(let i=1; i<n; i++) {
        for(let w=0; w<= capacity; w++) {
            let notTake = dp[i - 1][w];
            let take = -Infinity;
            if (weights[i] <= w) {
                take = values[i] + dp[i-1][w - weights[i]];
            }
            dp[i][w] = Math.max(take, notTake)
        }
    }

    return dp[n-1][capacity]
}

