function subsetSum(arr) {
    let result = [];
    const backTrack = function(start, sum) {
       if(start === arr.length) {
          result.push(sum);
          return;
       }

       //include
       backTrack(start + 1, sum + arr[start]);

       //exclude
       backTrack(start + 1, sum);
    }

    return result;
}