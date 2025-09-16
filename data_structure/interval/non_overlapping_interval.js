/*
Input: intervals = [[1,2],[2,3],[3,4],[1,3]]
[[1,2], [1,3], [2,3], [3,4]]
Output: 1
Explanation: [1,3] can be removed and the rest of the intervals are non-overlapping
*/

var eraseOverlapIntervals = function(intervals) {
  intervals.sort((a, b) => a[0] - b[0]);
  let counter = 0;
  let prevInterval = intervals[0][1]
  for(let i = 1; i < intervals.length; i++) {
      if (prevInterval > intervals[i][0]) {
        counter++;
    } else {
        prevInterval = intervals[i][1];
      }
  }

  return counter;
};