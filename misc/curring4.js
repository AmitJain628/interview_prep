console.log(currying(1)(2)(3)(4)(5)() + 1); // 16
console.log(currying(1)(2)(3)(4)(5) + 1); // 16

function sum(a,b,c,d,e) {
    return a+b+c+d+e
}

function currying(fn) {
    let arr = [];
    return function temp(...args) {
         arr = [...arr, ...args];
         if (arr.length >= fn.length) {
            const result = fn(...arr);
            const wrapper = function() {
                return result;
            }

            wrapper.valueOf = () => result;
            wrapper.toString = () => result;

            return wrapper;
         } else {
            return function(...nextArgs) {
                return temp(...nextArgs);
            }
         }
    }
}