function useDebounce(func, delay, immediate= false) {
    const timerId = useRef();
    const debounce = useCallback(() => {
            const args = Array.prototype.slice.call(arguments);
            const context = this;
            const callNow = immediate && !timerId.current
            clearTimeout(timerId.current);
            timerId.current = setTimeout(function() {
                if (!immediate) func.apply(context, args);
            },delay);
            if (callNow) {
                func.apply(context, args);
            }
    }, [func, delay, immediate]);

    return debounce;
}