function usinGRecursion(arr, target, index = 0) {

    if (target === 0) return true;
    if (index >=  arr.length || target < 0) return false; // Out of bounds
   
    return usinGRecursion(arr, target-arr[index], index++) || usinGRecursion(arr, target, index)
}

function usingDp(arr, k) {
    let dp = new Array(arr.length+1).fill().map(() => new Array(k+1).fill(false));

    for(let i = 0; i <= arr.length; i++){
        dp[i][0] = true;
    }

    for(let i = 1; i <= arr.length; i++){
        for(let target = 1; target <=k; target++) {
            if (target >= arr[i-1]) {
                dp[i][target] = d[i-1][target] || dp[i-1][target - nums[i-1]];
            } else {
                dp[i][target] = dp[i-1][target];
            }
        }
    }

    return dp[arr.length][k];
}


function usingRec(arr, target, index) {
   if(target === 0) return true;
   if (index === 0)  return arr[0] === target;


   let notake = usingRec(arr, target, index-1);
   let take = false;
    if (arr[index] <= target) {
        take = usingRec(arr, target-arr[index], index-1);
    }

    return take || notake
}


function newUsingDP(arr, target) {
    let n = arr.length;
    let dp = new Array(arr.length).fill().map(() => new Array(target+1).fill(false));

    for (let i = 0; i < n; i++) {
        dp[i][0] = true;
    }
    if (arr[0] <= target) dp[0][arr[0]] = true;

    for(let i=1; i<n; i++) {
        for(let targ = 1; targ<=target; targ++) {
            let notake = dp[i-1][targ];
            let take = false;
             if (arr[i] <= targ) {
                 take = dp[i-1][targ-arr[i]];
             }
         
             dp[i][targ] =  take || notake
        }
    }

    return dp[n-1][target];
}