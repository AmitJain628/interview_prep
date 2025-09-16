function ninjaTraining(n, points) {
    const getMaxDays = (index, last, points) => {
       if (index === 0) {
        let max = 0;
        for (let i = 0; i < points[index].length; i++) {
             if (i !== last)
              max = Math.max(max, points[index][i])
        }

        return max;
       }

       let max = 0;
       for(let i = 0; i < points[index].length; i++) {
         if (i!== last)
             max = Math.max(max, getMaxDays(index-1, i, points) + points[index][i])
       }
    }

    getMaxDays(n-1, 3, points);

}

function ninjaTrainingUsinDP(n, points) {
    let prev = Array(4).fill(0);

    // Base Case
    for (let last = 0; last < 4; last++) {
        let maxPoints = 0;
        for (let task = 0; task < 3; task++) {
            if (task !== last) {
                maxPoints = Math.max(maxPoints, points[0][task]);
            }
        }
        prev[last] = maxPoints;
    }

    // Bottom-Up DP
    for (let day = 1; day < n; day++) {
        let curr = Array(4).fill(0);
        for (let last = 0; last < 4; last++) {
            let maxPoints = 0;
            for (let task = 0; task < 3; task++) {
                if (task !== last) {
                    let taskPoints = points[day][task] + prev[task];
                    maxPoints = Math.max(maxPoints, taskPoints);
                }
            }
            curr[last] = maxPoints;
        }
        prev = curr;
    }

    return prev[3];
}


function ninjaTraining(n, points) {
    // Create a 2D array 'dp' with dimensions (n x 4) and initialize it with 0
    let dp = new Array(n);
    for (let i = 0; i < n; i++) {
      dp[i] = new Array(4).fill(0);
    }
  
    // Initialize the base cases for the first day
    dp[0][0] = Math.max(points[0][1], points[0][2]);
    dp[0][1] = Math.max(points[0][0], points[0][2]);
    dp[0][2] = Math.max(points[0][0], points[0][1]);
    dp[0][3] = Math.max(points[0][0], Math.max(points[0][1], points[0][2]));
  
    // Loop through each day and calculate the maximum points
    for (let day = 1; day < n; day++) {
      for (let last = 0; last < 4; last++) {
        dp[day][last] = 0;
        for (let task = 0; task <= 2; task++) {
          if (task !== last) {
            // Calculate the points for the current activity and update 'dp'
            let activity = points[day][task] + dp[day - 1][task];
            dp[day][last] = Math.max(dp[day][last], activity);
          }
        }
      }
    }
  
    // The maximum points are stored in dp[n-1][3]
    return dp[n - 1][3];
  }
  
  // Define the 'points' array with the ninja training data
  let points = [
    [10, 40, 70],
    [20, 50, 80],
    [30, 60, 90]
  ];
  
  // Get the number of days
  let n = points.length;
  
  // Call the 'ninjaTraining' function and print the result
  console.log(ninjaTraining(n, points));
  

