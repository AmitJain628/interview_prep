function memoizer(callback) {
    let result = {}

    return function() {
      const args = Array.prototype.slice.call(arguments);
       const key = JSON.stringify(args);

        if (result[key]) {
            return result[key]
        }
        const resultValue = callback.apply(this, args);
        result[key] = resultValue;

        return resultValue;
    }
}


function factorial(n) {
    if (n === 1 || n === 0) {
        return 1
    } 
    return n * factorial(n - 1)
}

const memoizedFactorial = memoizer(factorial);

console.log(memoizedFactorial(100)) // 120
console.log(memoizedFactorial(100))