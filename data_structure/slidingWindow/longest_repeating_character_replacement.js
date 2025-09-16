/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var characterReplacement = function(str, k) {
    let map = new Map();
    let left = 0;
    let right = 0;
    let maxLen = 0;
    let maxChar = 0;
    while(right < str.length) {
        map.set(str[right], (map.get(str[right]) || 0) + 1);
        maxChar = Math.max(maxChar, map.get(str[right]));

        if(right - left + 1 - maxChar > k) {
            map.set(str[left], map.get(str[left]) - 1);
            left++
        } else {
            maxLen = Math.max(maxLen, right - left + 1);
        }
        right++;
    }

    return maxLen;
};