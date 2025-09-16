/**
 * @param {string[]} tokens
 * @return {number}
 */
var evalRPN = function(tokens) {
    let stack = [];
    for (let token of tokens) {
        console.log(stack)
       if (token === "+" || token === "-" || token === "*" || token === "-" || token === "/") {
           let el1 = stack.pop();
           let el2 = stack.pop();
           if (token === "+") {
              stack.push(el1 + el2);
           } else if (token === "-") {
              stack.push(el2 - el1);
           } else if (token === "/") {
              stack.push(parseInt(el2/el1));
           } else if (token === "*") {
              stack.push(el1 * el2);
           }
       } else {
        stack.push(Number(token));
       }
    }

    return stack[0]
};