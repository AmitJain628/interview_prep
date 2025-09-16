function search2D(arr, target) {
    let row = 0;
    let col = arr[0].length - 1;

    while(row >= 0 && row < arr.length && col >= 0 && col < arr[0].length) {
        if(arr[row][col] = target) {
            return [row, col];
        }
        if (arr[row][col] > target) {
            col--
        } else {
            row++;
        }
    }

    return [-1, -1];
}


function search2D(arr, target) {
    let m = arr.length;
    let n = arr[0].length;
    let left =0;
    let right = m*n-1;

    while(left <= right) {
        let mid = Math.floor((left + right)/2);
        let midValue = arr[Math.floor(mid/n)][mid%n];

        if(midValue == target) {
            return [Math.floor(mid/n), mid%n];
        }

        if(midValue > target) {
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }

    return -1;
}