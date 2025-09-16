const helper = function (arr) {
    if (!Array.isArray(arr)) {
        throw new Error("Input must be an array");
    }
    let currentIndex = -1;
    return {
        next: function() {
        currentIndex++;
        return currentIndex < arr.length ? arr[currentIndex] : -1;
        },
        done: function() {
            return currentIndex >= arr.length;
        }
    }
}

const iterator = helper([1, 2, 3, 4, 5, 'hello']);

console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.done());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.done());