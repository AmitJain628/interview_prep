/*
Input: intervals = [[1,3],[2,6],[8,10],[15,18]]
Output: [[1,6],[8,10],[15,18]]

[[1,4],[4,5]]

*/

function mergeInterval(intervals) {
     intervals.sort((a, b) => a[0] - b[0]);

     for (let i = 0; i < intervals.length-1;) {
          if (intervals[i][1] >= intervals[i+1][0]) {
            intervals[i][1] = intervals[i][1] > intervals[i+1][1] ? intervals[i][1] : intervals[i+1][1];
            intervals.splice(i+1, 1);
          } else {
            i++;
          }
     }


     return intervals;
}

console.log(mergeInterval([[1,4],[4,5]]))