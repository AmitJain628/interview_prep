/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function(s, t) {
    if (s.length !== t.length) {
        return false;
    }

    const map = new Map();

    for (let ch of s) {
        map.set(ch, (map.get(ch) || 0) + 1)
    }

    for (let ch of t) {
        if (!map.has(ch)|| map.get(ch) === 0) return false;
        map.set(ch, map.get(ch) -1);
    }

    return true;

};