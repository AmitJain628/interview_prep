let orignalTimout = window.setTimeout;
let originalClearTimeout = window.clearTimeout;
function myTimeout() {
    let timerIds = [];
    return {
        clearMyTimeOut() {
            while(timerIds?.length) {
                originalClearTimeout(timerIds.pop());
            }
        },
        setMYTimeout(callback, delay) {
           let timerId = orignalTimout(callback, delay);
           timerIds.push(timerId);
        }
    }

}
let timeout = new myTimeout()
window.setTimeout = timeout.setTimeout;
window.clearAllTimeout = timeout.clearMyTimeOut;