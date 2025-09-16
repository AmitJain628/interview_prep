/*
Input -> [1,2,3,4,5]
k = 3
*/

const reverKQueue = function(queu, k) {
    let n = queu.size;

    if (k > n || k<0) return -1;

    let stack = [];

    for(let i=0; i<n-k;i++) {
        let ele = queu.shift();
        queu.push(el);
    }

    for(let i=0; i<k;i++) {
        stack.push(queu.shift());
    }

    while(stack.length > 0) {
        queu.push(stack.pop());
    }

    for (let i = 0; i < n - k; i++) {
        queue.push(queue.shift());
    }

    return queue;
}