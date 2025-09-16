const input = [5,7,7,8,8,10]
const search = 8
console.log([binarySearchFirst(input, search), binarySearchLast(input, search)]);

function binarySearchFirst(arr, search) {
    let low = 0, high = arr.length -1;
    while(low <= high) {
        const mid = Math.floor((low + high)/2);
        if (arr[mid] === search && (mid === 0 || arr[mid - 1] !== search)) {
            return mid;
        } 

        if (arr[mid] >= search) {
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }

    return -1;
}

function binarySearchLast(arr, search) {
    let low = 0, high = arr.length -1;

    while(low <= high) {
        const mid = Math.floor((low + high)/2);
        if (arr[mid] === search && (mid === arr.length -1 || arr[mid + 1] !== search)) {
            return mid;
        } 

        if (arr[mid] <= search) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }

    return -1;
}