/*
Transpose a matrix
change row to column

and reverse
*/

function rotate(arr) {
    let rows = arr.length;
    let cols = arr[0].length;

    for(let i=0; i<rows; i++) {
        for(let j=i+1; j<rows; j++) {
            let temp = arr[i][j];
            arr[i][j] = arr[j][i];
            arr[j][i] = temp;
        }
    }

    for(let row of rows) {
        arr[row].reverse();
    }

    return arr;
}