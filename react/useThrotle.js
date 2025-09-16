function useThrotle(func, delay) {
    const timerId = useRef(null)
    const lastRan = useRef(0);
    const throttle = useCallback((...args) => {
        const context = this
        if (!lastRan) {
            func.apply(context, args);
            lastRan.current = Date.now();
        } else {
            if (timerId.current) {
                clearTimeout(timerId.current);
            }

            timerId.current = setTimeout(() => {
                if (Date.now() - lastRan > delay) {
                    func.apply(context, args);
                    lastRan.current = Date.now();
                }
            }, delay - (Date.now() - lastRan.current));
        }

    },[func, delay]);

    return throttle;
}