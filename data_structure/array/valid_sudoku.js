/*
valid sudoku
Determine if a 9 x 9 Sudoku board is valid. Only the filled cells need to be validated according to the following rules:

Each row must contain the digits 1-9 without repetition.
Each column must contain the digits 1-9 without repetition.
Each of the nine 3 x 3 sub-boxes of the grid must contain the digits 1-9 without repetition
*/

function validSudoku(arr) {
    let rows = arr.length;
    let cols = arr[0].length;
    let map = new Map();
    for (let i=0; i<rows; i++) {
        for (let j=0; j<cols; j++) {
            let char = arr[i][j];
            if (char !== '.') {
                let row = `${char} current row of ${i}`;
                let col = `${char} current col of ${j}`;
                let box = `${char} current box ${Math.floor(i/3)} ${Math.floor(j/3)}`;

                if(map.has(row) || map.has(col) || map.has(box)) {
                    return false
                } 

                map.set(row, 1);
                map.set(col, 1);
                map.set(box, 1);
            }
        }
    }

    return true;
}