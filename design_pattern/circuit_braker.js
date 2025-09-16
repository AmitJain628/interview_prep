function circuitBreaker(fn, timeThreshold, failureCountThreshold) {
    let failureCount = 0;
    let lastFailureTime = null;
    let isClosed = false;
    return function(...args) {
        let context = this;
        if (isClosed) {
            const diff  = Date.now() - lastFailureTime;
            if (diff > timeThreshold) {
                isClosed = false
            } else {
                console.log("service unavailable");
                return;
            }

        } else {
            try {
               const res = fn.apply(context, args);
               failureCount = 0;
               lastFailureTime = null
            } catch(error) {
                failureCount++;
                lastFailureTime = new Date();

                if (failureCount >= failureCountThreshold) {
                    isClosed = true;
                }
            }
        }

    }
}