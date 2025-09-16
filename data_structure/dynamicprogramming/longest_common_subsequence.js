/**
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
// var longestCommonSubsequence = function(text1, text2) {
//     let max = -Infinity;
//     const getLongest = (index1, index2) => {
//          if (index1 < 0 || index2 < 0) return 0;

//          if (text1[index1] === text2[index2]) return 1 + getLongest(index1-1, index2-1);

//          return Math.max(getLongest(index1, index2-1), getLongest(index1-1, index2));
//     }

//     return getLongest(text1.length-1, text2.length-1);
// };

var longestCommonSubsequence = function(text1, text2) {

    let m = text1.length;
    let n = text2.length;
    let dp = Array(m+1).fill().map(() => Array(n+1).fill(0));

   // first string row
    for (let i =0; i<=m; i++) {
        dp[i][0] = 0
    }
    for (let i =0; i<=n; i++) {
        dp[0][i] = 0
    }

    

    for (let i =1; i<=m; i++) {
        for (let j = 1; j<=n; j++) {
          if (text1[i-1] === text2[j-1]) {
          dp[i][j] =   1 + dp[i-1][j-1];
          } else {
           dp[i][j] = Math.max(dp[i][j-1], dp[i-1][j]);
          }
        }
    }

    return dp[m][n]
};