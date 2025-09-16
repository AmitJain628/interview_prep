/**
 * @param {string} s
 * @return {string[][]}
 */

function pallindrom(str) {
    let left = 0;
    let right = str.length - 1;

    while(left < right) {
        if(str[left] !== str[right]) return false;
        left++;
        right--;
    }

    return true;
}

var partition = function(s) {
    let result = [];

    const backtrack = (index, path) => {
         if(index === s.length) {
            result.push([...path]);
            return;
         }

         for(let i = index; i< s.length; i++) {
     //       console.log("str",s.slice(index, i + 1) , pallindrom(s.slice(index, i + 1)), path, "index", index, i);
            if(pallindrom(s.slice(index, i + 1))) {
                path.push(s.slice(index, i + 1));
                backtrack(i+1, path);
                path.pop();
            }
         }
    }

    backtrack(0, []);
    return result;
};