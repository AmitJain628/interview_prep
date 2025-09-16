function wordBreak(word, dict) {
    if(s == null || s.length === 0){
        return false;
    }
    let dp = new Array(word.length+1).fill(false);
    dp[0] = true;
    
    for(let i = 0; i <= word.length; i++) {
       for (let word of dict) {
        let start = i - word.length;
        if (start >=0 && dp[start] && word.substring(start, i) === word) {
            dp[i] = true;
            break;
        }
       }
    }
    return dp[word.length];
}