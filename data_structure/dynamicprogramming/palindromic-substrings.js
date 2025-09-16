var countSubstrings = function(s) {
  if (s === null || s.length === 0) return 0;
  
  let count = 0;

  for (let i = 0; i < s.length; i++) {
      count += expandAroundCenter(s, i, i); // odd length palindrome
      count += expandAroundCenter(s, i, i + 1); // even length palindrome
    }

    function expandFromMiddle(s, i, j) {
        let ans = 0;
        while (i >= 0 && j < s.length && s[i] === s[j]) {
            ans++;
            i--;
            j++;
        }

        return ans;
    }

    return count;
};