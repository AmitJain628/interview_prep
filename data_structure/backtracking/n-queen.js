/**
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function(n) {
    let rows = n;
    let cols = n;
    let ans = [];
    let arr = Array(n).fill().map(() => Array(n).fill('.'));

    function isSafe(row, col) {
        let r = row;
        let c = col;

        // check upper diagonal
        while(r>=0 && c>=0) {
            if(arr[r][c] === 'Q') return false;
            r--;
            c--;
        }

        r = row;
        c = col;

        // check same row
        while(c>=0) {
            if(arr[r][c] === 'Q') return false;
            c--;
        }

        r = row;
        c = col;

        // check lower dialoganl
  while (r < rows && c >= 0) {
      if (arr[r][c] === 'Q') return false;
      r++;
      c--;
    }

    return true;




    }

    function solve(col) {
         if (col === cols) {
            ans.push(arr.map(res => res.join("")));
            return;
         }

         for(let row=0; row<rows; row++) {
            if (isSafe(row, col)) {
                //console.log("row", row, col)
                arr[row][col] = 'Q';
                solve(col+1);
                arr[row][col] = '.';
            }
         }
    }

    solve(0);

    return ans;
    
};