function sum(...args) {
    let sum = args;

    const tempFn = function(...args) {
        sum =[...args, ...sum];
        return tempFn;
    }

    tempFn.valueOf = function(...args) {
        return sum.reduce((acc, curr) => acc + curr, 0);
    }

    tempFn.value = tempFn.valueOf;

    return tempFn;
}

console.log(sum(1)(2)(3).value())
console.log(sum(1)(2) + 3)
