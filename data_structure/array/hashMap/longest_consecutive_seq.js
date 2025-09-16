input = [100,4,200,1,3,2];
output = 4;

function findLongestConsecutiveSequence(arr) {
    let map = new Map();
    for(let i = 0; i < arr.length; i++) {
        map.set(arr[i], 1);
    }

    let maxLength = 0;

    for (let num of arr) {
        if (map.has(num-1)) { 
            let currentLength = 1;
            let currentNum = num;
            while (map.has(currentNum)) {
                currentLength++;
                currentNum++;
            }

            maxLength = Math.max(maxLength, currentLength);
        }
    }

    return maxLength;
}