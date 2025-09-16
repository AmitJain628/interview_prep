function throtling (func, delay) {
    let timerId;
    let lastRan;
    return function () {
        let args = arguments;
        let context = this;
        if (!lastRan) {
            func.apply(context, args);
            lastRan = Date.now();
        } else {
            clearTimeout(timerId);
            timerId = setTimeout(() => {
                if ((Date.now() - lastRan) >= delay) {
                    func.apply(context, args);
                    lastRan = Date.now();
                }
            }, delay - (Date.now() - lastRan));
        }
    }
}