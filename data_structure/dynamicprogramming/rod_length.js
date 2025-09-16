function getRodLength(price, n) {
    const calculateMaxLength = (price , n, index) => {

        if (index === 0) {
            return n * price[0];
        }

        let notTake = calculateMaxLength(price, n, index -1);
        let take = -Infinity;
        let rodLen = index + 1;
        if (rodLen <= n){
            take = price[index] + calculateMaxLength(price, n - rodLen, index);
        }
        return Math.max(take, notTake);
    }
    
    calculateMaxLength(price, n, price.length - 1)

}

function getRodLengthUsingDp(price, n) {
    let dp = Array(n+1).fill().map(() => Array(price.length).fill(0));

    for(let i =0; i<=n; i++){
        dp[0][i] = i * price[0];
    }

    for(let i = 1; i<n; i++){
        for (let j = 0; j<=n; j++){
            let notTake = dp[i-1][j];
            let take = -Infinity;
            let rodLen = i + 1;
            if (rodLen <= j){
                take = price[i] + dp[i][j-rodLen];
            }
            dp[i][j] = Math.max(take, notTake);
        }
    }

    return dp[n - 1][n];
}