/*

for every element, calculate next smaller element and prev smaller element
rect = (nse - prev) * height[i];

*/
function largest(heights) {
 let stack = [];
 let i = 0;
 let maxArea = -Infinity;

 while(i< heights.length) {
    while(stack.length && heights[stack[stack.length - 1]] > heights[i]) {
        let el = stack.pop();
        let nse = i;
        let pse = stack.length === 0 ? -1 :  stack[stack.length-1];
        area = heights[el] * (nse - pse -1);
        maxArea = Math.max(area, maxArea);
    }

    stack.push(i++);
 }

 while(stack.length) {
     let nse = heights.length;
     let el = stack.pop();
     let pse = stack.length === 0 ? -1 :  stack[stack.length-1];
     let area = heights[el] * (nse - pse -1);
     maxArea = Math.max(area, maxArea);
}

return maxArea;
}