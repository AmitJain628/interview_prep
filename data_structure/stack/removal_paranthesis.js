/**
 * @param {string} s
 * @return {string[]}
 */
var removeInvalidParentheses = function(s) {
    function isValid(s) {
        let stack = [];
        for(let i=0; i<s.length; i++) {
            if (s[i] === "(") {
                stack.push(s[i]);
            } else if(s[i] == ")") {
                if (stack.length === 0) {
                    return false;
                }
                stack.pop();
            }
        }

      return stack.length === 0;
    }

    let q = [s];
    let visited = new Set();
    visited.add(s);
    let res = [];
    let level = false

    while(q.length && !level) {
        for (let el of q) {
        if (isValid(el)) {
           level = true;
           res.push(el);
        }
        if (level) continue;

        for(let i =0; i < el.length; i++) {
            if (el[i] !== "(" && el[i] !== ")") continue;
            let str = el.slice(0, i) + el.slice(i + 1);
            if (!visited.has(str)) {
              q.push(str);
              visited.add(str);
            }
        }
        }
    }

    return res;
};