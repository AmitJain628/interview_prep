/*
Input: coins = [1,2,5], amount = 11
Output: 3
Explanation: 11 = 5 + 5 + 1
0 1 2 3
0 1 2  
1 -> 1 [1]
2 -> 1 [2]
3 -> 2 [1, 2]
4 -> 2 [2, 2]
5 -> 1 [5]
6 -> 2 [1, 5]
7 -> 3 [2, 5]
8 -> 4 [1, 2, 5]
9 -> 5 [2, 2, 5]
10 -> 2 [5, 5]
11 -> 3 [1, 5, 5]
*/
function coinChange(coins, amount) {
   let n = coins.length;
   let dp = new Array(amount + 1).fill(Infinity);
   dp[0] = 0;

   for(let i =0; i<=amount; i++) {
    for (let coin of coins) {
        if (i >= coin) {
            dp[i] = Math.min(dp[i], 1 + dp[i-coin]);
        }
    }
   }

  return dp[amount] === Infinity? -1 : dp[amount];
}

function coinChangeUsingRecursion(index, target, coins) {

    if (index === 0) {
        if (target % coins[index] === 0) return target / coins[index];
        return Infinity;
    }
    let notTake = 0 +  coinChangeUsingRecursion(index-1, target, coins);
    let take = Infinity;
    if (target <= coins[index]) {
        take = 1  + coinChangeUsingRecursion(index, target - coins[index], coins);
    }

    return Math.min(notTake, take);
}

function coinChange(coins, amount) {
    let n = coins.length;
    let dp = new Array(n);
    for(let i=0; i<n;i++) {
        dp[i] = Array(amount+1).fill(Infinity);
    }
    
    for(let targ =0; targ <= amount; targ++){
        dp[0][targ] = targ % coins[0] === 0 ? (targ / coins[0]) : Infinity
    }
 
    for(let index=1; index<n; index++) {
     for (let amt =0; amt <= amount; amt++) {
        let notTake = 0 +  dp[index-1][amt];
        let take = Infinity;
        if (coins[index] <= amt) {
            take = 1  + dp[index][amt - coins[index]];
        }
        dp[index][amt] = Math.min(take, notTake);
     }
    }
 
   return dp[n-1][amount] === Infinity? -1 : dp[n-1][amount];
 }