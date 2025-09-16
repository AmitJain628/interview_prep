/*
 i/p -> bdaba
 o/p -> aba

 0   1   2  3   4
 b   d   a  b   a

*/

var longestPalindrome = function(str) {
    if(str === null || str.length === 0){
      return '';
  }

  let curr = 0;
  let max = 1;
  for (let i = 0; i < str.length; i++) {
    expandFromMiddle(str, i, i);
    expandFromMiddle(str, i, i+1);
  }


  function expandFromMiddle(str, start, end) {
      while (start >= 0 && end < str.length && str[start] === str[end]) { 
          if (end - start + 1 > max) {
              max = end - start + 1;
              curr = start; 
          }
          start--;
          end++;
      }
  }

  return str.substring(curr, curr+max)
}