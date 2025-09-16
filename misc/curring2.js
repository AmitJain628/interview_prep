function curry(fn) {
    // Returns a function that will accumulate arguments
    return function curried(...args) {
        console.log("fn", fn.length, args.length)
        // If the function already has enough arguments, execute it
        if (args.length >= fn.length) {
            return fn(...args);
        } else {
            // Otherwise, return a function that will accumulate more arguments
            return function(...newArgs) {
                return curried(...args, ...newArgs);
            };
        }
    };
}

// Example function to sum 3 numbers
function sum(a, b, c) {
    return a + b + c;
}

// Curried version of sum
const curriedSum = curry(sum);

// Test cases
console.log(curriedSum(1)(2)(3));  // Output: 6
console.log(curriedSum(1, 2)(3));  // Output: 6
