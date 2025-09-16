// clearAllTimeout -> Store all the timeout and clear all of them

timeoutIds = [];

clearAllTimeout = function() {
    while(timeoutIds?.length) {
        clearTimeout(timeoutIds.pop());
    }
}

const mySetTimeout = setTimeout

setTimeout = function(func, delay) {
     const id = mySetTimeout(func, delay);
     timeoutIds.push(id);
     return id;
}

setTimeout(() => console.log('setTimeout 1'), 200); 
setTimeout(() => console.log('setTimeout 2'), 300); 
setTimeout(() => console.log('setTimeout 3'), 300); 
setTimeout(() => console.log('setTimeout 4'), 400); 
setTimeout(() => console.log('setTimeout 5'), 500); 

clearAllTimeout();
setTimeout(() => console.log('setTimeout 6'), 400); 