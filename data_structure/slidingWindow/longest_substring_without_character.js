function longestSubString(str) {
    let left = 0;
    let right = 0;
    let maxLen = 0;
    let map = new Map();

    while(right < str.length) {
        if (map.has(s[right])) {
            left = Math.max(left, map.get(s[right]) + 1);
        }
        map.set(s[right], right);
        maxLength = Math.max(maxLength, right - left + 1);
        right++
    }


    return maxLen;
} 