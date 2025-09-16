/*
M = [
      0  1  2  3
0    [1, 0, 0, 1],
1    [1, 1, 0, 0],
2    [1, 1, 1, 1],
3    [0, 0, 1, 1]
]

candidate = 0;
[0][1] -> [0][2] -> [0][3]
candidate = 3 

*/

function celebrity(mat) {
  let stack = [];

  for(let i =0; i < mat.length; i++) {
    stack.push(i);
  }

  while(stack.length > 1) {
    let a = stack.pop();
    let b = stack.pop();

    if(mat[a][b] === 1) {
        stack.push(b);
    } else {
        stack.push(a);
    }
  }

  let candidate = stack.pop();

  // verify candidate
  for(let i=0; i<mat.length; i++) {
    if (i === candidate) continue;

    if(mat[candidate][i] === 1 || mat[i][candidate] === 0) {
        return -1;
    }
  }

  return candidate;
}