function sudokoSolver(arr) {
    solve(arr);
    function solve(arr) {
        let row = arr.length;
        let col = arr[0].length;
        for(let i = 0; i < row; i++) {
            for(let j = 0; j < col; j++) {
                if(arr[i][j] === ".") {
                for(let ch = "1"; ch <= "9"; ch++) {
                    if(isValid(arr, i, j, ch)) {
                        arr[i][j] = ch;
                        if(sudokoSolver(arr)) return true;
                        arr[i][j] = ".";
                        }
                   }
                   return false;
                }
            }
       }
    return true;
   }
   
   function isValid(board, row, col, ch) {
    for(let i=0; i<9; i++) {
        if(board[row][i] == ch) return false;
        if(board[i][col] == ch) return false;

        if(board[Math.floor(row/3)*3 + Math.floor(i/3)][Math.floor(col/3)*3 + i%3] == ch) return false;
    }

    return true;

   }
   
}