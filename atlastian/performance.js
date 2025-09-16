/*
Build a function to measure performance of a given function(s). 
I tried to use Date.now and later realised about using Performance.now group of functions. 
Hint: Run functions multiple time to get average running time. Also handle Sync and Async functions.
*/

function measure(fn) {

    if (typeof fn !== "function") {
        throw new Error("error in running function")
    }

    let async = false;
    if(asyncFunc.constructor.name === "AsyncFunction") {
        async = true;
    }

    try {
        fn();
    } catch (error) {
        throw new Error("error in running function")
    }

    let total = 0;
    for(let i=0; i<5; i++) {
        const start = performance.now();
        fn();
        const end = performance.end();
        
        total += end - start
    }

    let avg = total /5;
}