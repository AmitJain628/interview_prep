```
i/p = 'aabcb'
o/p = 'a#bbc'
```

function firstNonRepeatingCharacter(str) {
  let i =0;
  let res = [];
  let firstRepeating = '#';
  let hash = new Map();

  while(i < str.length) {
    if (!hash.has(str[i])) {
        hash.set(str[i], 1);
        if (firstRepeating === '#') {
            firstRepeating = str[i]
        }
    } else {
        hash.set(str[i], hash.get(str[i]) + 1);
        if (firstRepeating === str[i]) {
            firstRepeating = '#';
        }
        let j = i-1;
        while(j>=0  && str[j] !== str[i]) {
            if (hash.get(str[j]) == 1) {
                firstRepeating = str[j];
            }
            j--;
        }
    }

    res.push(firstRepeating);
    i++;
  }
}

console.log(firstNonRepeatingCharacter('aabc'));


function firstNonRepeatingCharacters(str) {
    let queue = [];
    let map = new Map();

    let i=0;

    while(i < str.length) {
        if(!map.has(str[i])) {
            queue.push(str[i]);
        }
        map.set(str[i], map.get(str[i]) || 0 + 1);

        while(queue.length > 0) {
             if(map.get(queue[0]) > 1) {
                queue.shift();
             }
        }
  
        res.push(queue.length > 0 ? queue[0] : '#'); // Use '#' if no non-repeating character exists
        i++;
    }

    return res;
}