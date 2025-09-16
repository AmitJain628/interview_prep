
const timeout = {
    timeoutIds: {},
    randomId: function() {
        let randomId = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
        while (timeout.timeoutIds.hasOwnProperty(randomId)) {
            randomId = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
        }
        return randomId;
    },
    setTimeout: function(callback, delay) {
        if(typeof callback !== "function"){
            throw new TypeError("callback should be function");
          }
        
          if(typeof delay !== "number"){
            throw new TypeError("delay should be number")
          }
        const randomId = this.randomId();
        this.timeoutIds[randomId] = {
            time: Date.now() + delay,
            callback: callback
        }

        return randomId;
    },
    clearTimeout: function(id) {
        if (this.timeoutIds.hasOwnProperty(id)) {
            delete this.timeoutIds[id];
        }
    },
    check: function() {
        const currentTime = Date.now();
        for (let id in this.timeoutIds) {
            if (this.timeoutIds.hasOwnProperty(id)) {
                const timeoutObj = this.timeoutIds[id];
                if (timeoutObj.time <= currentTime) {
                    timeoutObj.callback();
                    this.clearTimeout(id);
                }
            }
        }

        
        requestIdleCallback(this.check.bind(this));
    }
}

requestIdleCallback(timeout.check.bind(timeout));


const timeoutId = timeout.setTimeout(() => {
    console.log("This message will be logged after 2 seconds");
}, 200);