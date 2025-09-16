/*
nums = [1,2,3,4]
[1, 1]

[]
[1 2, 6, 24]
Output: [24,12,8,6]

create two arrays prefix and postfix
prefix -> [1,   1, 2, 6]
postfix -> [ 24,12,4,1]

[]

*/

function productSelf(arr) {
    const result = [];
    let prefix = 1;
    let postfix = 1;
    for (let i = 0; i < arr.length; i++) {
        result[i] = prefix;
        prefix = arr[i] * prefix 
    }

    for (let i = arr.length - 1; i >= 0; i--) {
        result[i] *= postfix;
        postfix *= arr[i]
    }

    return result;
}


