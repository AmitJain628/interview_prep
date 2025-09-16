/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function(arr) {
    let left = 0;
    let right = arr[0].length-1;
    let top = 0;
    let bottom = arr.length-1;
    let res = [];
    console.log("left", left, right, top, bottom)

    while(left <= right && top <= bottom) {
        for(let i=left; i<=right; i++) {
            res.push(arr[top][i]);
        }
        top++;
       // console.log("1", "left", left, "top", top, "right", right, "res", res);

        for(let i=top; i<=bottom; i++) {
            res.push(arr[i][right]);
        }
        right--;
      //  console.log("2", "right", right, "bottom", bottom, "top", top, "res", res);

        if (top <= bottom) {
            for(let i=right; i>=left; i--) {
                res.push(arr[bottom][i]);
            }
            bottom--;
        }

        if (left <= right) {
            for(let i=bottom; i>=top; i--) {
                res.push(arr[i][left]);
            }
            left++;
        }
    }

    return res;
};