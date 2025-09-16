/*
Given an array of meeting time intervals consisting of start and end times [[s1,e1],[s2,e2],...] (si < ei), find the minimum number of conference rooms required.

Example 1:

Input: [[0, 30],[5, 10],[15, 20]]
Output: 2

0  5  15
 10 20 30
*/
function meetingRooms(intervals) {
    let startTime = [];
    let endTime = [];
    let rooms = 0;
    let maxRooms = 0
    let start = 0;
    let end = 0;

    for(let i = 1; i < intervals.length; i++) {
       startTime.push(intervals[i][0]);
       endTime.push(intervals[i][1]);
    }

    startTime.sort((a, b) => a - b);
    endTime.sort((a, b) => a - b);

    while(start < intervals.length) {
        if (startTime[start] < endTime[endTime]) {
            rooms++;
            maxRooms = Math.max(maxRooms, rooms);
            start++;
        } else {
            rooms--;
            end++;
        }
    }

    return maxRooms;
}

