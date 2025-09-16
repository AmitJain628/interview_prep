/**
 * @param {number[]} hand
 * @param {number} groupSize
 * @return {boolean}
 */
var isNStraightHand = function(hand, groupSize) {
    let map = new Map();
    for (let el of hand) {
        if (!map.has(el)) {
            map.set(el, 0)
        }
        map.set(el, map.get(el) + 1);
    }

    const arr = [...map.keys()].sort((a,b) => a - b);
    //console.log("map", map, arr)
    for (let el of arr) {
        let freq = map.get(el);
        if (freq > 0) {
          for (let i = el; i < (el + groupSize); i++) {
            if ((map.get(i) || 0) < freq) return false;
            map.set(i, map.get(i) - freq)
          }  
        }
    }

    return true;
};