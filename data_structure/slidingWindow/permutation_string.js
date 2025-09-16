/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var checkInclusion = function(s1, s2) {
    if (s1.length > s2.length) return false;

    let s1Freq = new Array(26).fill(0);
    let windowFreq = new Array(26).fill(0);

    for(let i=0; i<s1.length; i++) {
        s1Freq[s1.charCodeAt(i) - 'a'.charCodeAt(0)]++
    }

    for (let i=0; i<s2.length; i++) {
        windowFreq[s2.charCodeAt(i) - 'a'.charCodeAt(0)]++

        
        if (i >= s1.length) {
            windowFreq[s2.charCodeAt(i - s1.length) - 'a'.charCodeAt(0)]--
        }

        if (windowFreq.toString() === s1Freq.toString()) {
            return true;
        }
    }

    return false;

}


function isEqual(obj1, obj2) { 
    if (Object.keys(obj1).length !== Object.keys(obj2).length) {
        return false
    }

    for (let key in obj1) {
        if (obj1[key] !== obj2[key]) {
            return false
         }
    }

    return true;
}