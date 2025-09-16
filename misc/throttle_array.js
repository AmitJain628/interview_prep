const task = [1,2,3,4,5,6,7,8,9,10];
const count = 5;

function throttle(callback, count, task, time) {
    let timerId;
    let lastRan;
    let queue = []
    return function() {
        let context = this;
        if (!lastRan) {
            queue = [...queue, ...task];
            execute = queue.splice(0, count);
            callback.apply(context, execute);
            lastRan = Date.now();
        } else {
            clearTimeout(timerId);
            timerId = setTimeout(() => {
                if ((Date.now() - lastRan) >= time) {
                    queue = [...queue, ...task];
                    execute = queue.splice(0, count);
                    callback.apply(context, execute);
                    lastRan = Date.now();
                }
            }, time - (Date.now() - lastRan));
        }
    }
}


throttle(task, count, 2000); // [1, 2, 3, 4, 5] // immediately 
throttle(task, count, 2000); // [6, 7, 8, 9, 10] // after 2 seconds
throttle(task, count, 2000); // [1, 2, 3, 4, 5] // after 2 seconds 