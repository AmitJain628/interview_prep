
function insertInterval(intervals, newInterval) {
    let newStart = newInterval[0];
    let newEnd = newInterval[1];

    let mergedIntervals = [];  
    let i =0;
    let len = intervals.length;

    while(i<len && intervals[i][1] < newStart)  {
        mergedIntervals.push(intervals[i])
        i++;
    }

    while(i<len && intervals[i][0] < newEnd) {
        newInterval = [Math.min(intervals[0], newStart), Math.max(intervals[1], newEnd)];
        i++;
    }

    result.push(newInterval);


    while(i<len) {
        mergedIntervals.push(intervals[i])
        i++;
    }

    return mergedIntervals
}