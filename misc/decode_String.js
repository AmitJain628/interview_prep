const input1 = '2[a2[b]]';
const input2 = '3[b2[ca]]';


function decodeString(s) {
    const stack = [];
    let currStr = "";
    let currNum = 0;

    for (const char of s) {
        if(!isNaN(char)) {
           currNum = currNum * 10 + parseInt(char, 10);
        } else if(char === '[') {
            stack.push([currStr, currNum]);
            currStr = "";
            currNum = 0;
        } else if(char === ']') {
            const [prevStr, currNum] = stack.pop();
            currStr += prevStr + currStr.repeat(currNum);
        } else {
            currStr += char;
        }
    }


    return currStr;
}

// Examples
console.log(decodeString("2[a2[b]]"));  // Output: "abbabb"
console.log(decodeString("3[b2[ca]]")); // Output: "bcacabcacabcaca"
