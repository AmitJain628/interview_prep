/*
Input: rooms = [[2147483647,-1,0,2147483647],[2147483647,2147483647,2147483647,-1],[2147483647,-1,2147483647,-1],[0,-1,2147483647,2147483647]]
Output: [[3,-1,0,1],[2,2,1,-1],[1,-1,2,-1],[0,-1,3,4]]
Time Complexity: 
𝑂
(
𝑚
×
𝑛
)
O(m×n) → Every cell is processed once.
Space Complexity: 
𝑂
(
𝑚
×
𝑛
)
O(m×n) → In the worst case, all rooms are added to the queue.

*/

function wallsAndGate(arr) {
    let rows = arr.length;
    let cols = arr[0].length;
    let queue = [];
    let INF = 2147483647;
    for (let i = 0; i < rows; i++) {
       for (let j = 0; j < cols; j++) {
        if (arr[i][j] === 0) {
            queue.push([i, j]);
        }
       }
    }

    const directions = [[1,0], [-1, 0], [0, 1], [0,-1]]
    
    
    while(queue.length) {
        const [i, j] = queue.shift();

        for (let [x, y] of directions) {
            const newX = i + x;
            const newY = j + y;

            if(newX >= 0 && newY >=0 && newX < rows && newY < cols && arr[newX][newY] === INF) {
                arr[newX][newY] = arr[i][j] + 1;
                queue.push([newX, newY]);
            }
        }
    }

    return arr;
}

console.log(wallsAndGate([[2147483647,-1,0,2147483647],[2147483647,2147483647,2147483647,-1],[2147483647,-1,2147483647,-1],[0,-1,2147483647,2147483647]]))