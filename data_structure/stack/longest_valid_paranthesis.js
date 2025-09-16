function longestValidParanthesis(str) {
    let stack = [-1];
    let max = -Infinity;

    for (let i=0; i<str.length; i++) {
        if (str[i] === "(") {
            stack.push(i);
        } else {
            let el = str.pop();
            if (stack.length === 0) {
               stack.push(i);
            } else {
                max = Math.max(max, i - stack[stack.length - 1]);
            }
        }
    }

    return max;
}