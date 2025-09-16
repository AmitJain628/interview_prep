/*
[1,3,-1,-3,5,3,6,7]  [3, 3, 5, 5, 6, 7]
left    right    currebt       queue         window
0       0        1             [0]            [1]
0       1        3              [1]           [3]
0       2        -1             [1, 2]        [3, -1]     
1       3        -3             [1,2, 3]      [3, -1, -3]        
2       4        5              [4]            [5]
3       5        3              [4, 5]         [5, 3]
4       6        6              [6]            [6]
5       7        7               [7]           [7]
*/
function maxWindow(nums , k) {
    let left = 0;
    let right = 0;
    let res = [];
    let queue = [];

    while(right< queue.length) {
        while(queue.length > 0 && nums[queue[queue.length -1]] < nums[right]) {
            queue.pop();
        }

        que.push(right);

        if(left > queue[0]) {
            queue.shift();
        }

        if(right - left === k - 1) {
            res.push(nums[queue[0]]);
            left++
        }

        right++
    }
}