function minWindow(s, t) {
    let map = new Map();

    for (let ch of t) {
        map.set(ch, (map.get(ch) || 0) + 1);
    }
    let left = 0;
    let right = 0;
    let minLen = Infinity;
    let startIndex = -1;
    let counter = 0;
    while(right < s.length) {
        let ch = s[right];
        if(map.has(ch) && map.get(ch) > 0) {
            counter++;
        }
        map.set(ch, (map.get(ch) || 0) - 1);

       while(counter === t.length) {
        if (minLen > right - left+ 1) {
           minLen = right-left+1;
           startIndex = left;
       }
       map.set(s[start], (map.get(s[start]) || 0) + 1);

       if (map.get(s[start]) > 0) {
        counter--;
       }

       left++
      }

    }
}