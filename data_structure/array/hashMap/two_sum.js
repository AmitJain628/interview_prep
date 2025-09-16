function twoSum(arr, target) {
    const map = {}
    for (let i=0; i<arr.length; i++) {
        if (typeof map[target - arr[i]] !== 'undefined') {
              return [i, map[target - arr[i]]];
        } else {
            map[arr[i]] = i
        }
    }
}