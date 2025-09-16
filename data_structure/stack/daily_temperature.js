/*
Input: temperatures = [73,74,75,71,69,72,76,73]
Output: [1,1,4,2,1,1,0,0]
*/

function dailyTemperature(arr) {

    let result = new Array(arr.length).fill(0);
    let stack = [];
    stack.push(0);

    for (let i = 1; i < arr.length; i++) {
        let temp = arr[i];
        while(temp > arr[stack[stack.length - 1]]) {
            let top = stack.pop();
            result[top] = i - top;
        }
        stack.push(i);
    }

    return result;
}