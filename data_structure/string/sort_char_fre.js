/**
 * @param {string} s
 * @return {string}
 */
var frequencySort = function(s) {
    const map = new Map();
    
    for(let i = 0; i < s.length; i++) {
        map.set(s[i], (map.get(s[i]) || 0) + 1);
    }
  
    const sortedArr = Array.from(map.entries()).sort((a, b) => b[1] - a[1]);
    let result = '';
  
    for(let [key, val] of sortedArr) {
      result += key.repeat(val);
    }
  
    return result;
  };