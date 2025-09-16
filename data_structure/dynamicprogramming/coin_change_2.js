/*
Input: coins = [1,2,5], amount = 5
Output: 3
Explanation: 11 = 5 + 5 + 1
0  1  2  3  4  5   
0  0  0  0  0  0
0  1  1  1  1  1
0  1  2   
0  1  1  2  2  1  
*/
function coinChange(coins, amount) {
    let n = coins.length;
    let dp = new Array(amount + 1).fill(0);
    dp[0] = 1;
 
   for(let coin of coins) {
    for (let i = coin; i <= amount; i++) {
        dp[i] += dp[i - coin];
    }
   }
 
   return dp[amount];
 }

 function usingRecurssion(index, target) {

    if(index === 0) {
        if (target % arr[index] === 0) {
            return 1;
        }
        return 0;
    }


    let notTake = 0 + usingRecurssion(index-1, target);
    let take = 0;
    if (arr[index] <= target) {
        take = usingRecurssion(index, target-arr[index]);
    }

    return notTake + take;
 }

 function usingRecurssion(coins, target) {
    let n = coins.length;
    let dp = new Array(n);
    for(let i=0; i<n;i++) {
        dp[i] = Array(target+1).fill(0);
    }

    for(let targ =0; targ <= target; targ++){
        dp[0][targ] = targ % coins[0] === 0;
    }
 

    for(let index=1; index<n;index++) {
        for(let targ = 0; targ<=target; targ++) {
            let notTake = 0 + dp[index-1][targ];
            let take = 0;
            if (arr[index] <= targ) {
                take = dp[index][targ-coins[index]];
            }
        
            dp[index][targ] =  notTake + take;
        }
    }

    return dp[n-1][target];
 }