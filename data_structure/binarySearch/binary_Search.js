function binarySearch(arr, target) {
    let low = 0;
    let high = arr.length - 1;

    while(low <= high) {
        let mid = Math.floow((low+high) / 2);
        if (arr[mid] === target) {
            return mid;
        }

        if (arr[mid] < left) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }

    return -1;
}