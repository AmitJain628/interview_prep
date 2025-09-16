```function createMemo() {
    let args = Array.prototype.slice.call(arguments);
    let res;
    let lastDeep = [];
    let callback = args.shift();

    return function useMemo(fn, depArr) {
        if (!lastDeep || depArr.length !== lastDeep.length || depArr.some((dep, i) => dep !== lastDeep[i])) {
            res = fn();
            lastDeep = depArr;
        }
        return res;
    }
}
```

function useMemo(callback, deps) {
    let memorizedRef = useRef({
        lastDeps: [],
        value: null
    });

    if (memorizedRef.current.lastDeps.length === 0 || !compare(memorizedRef.current.lastDeps, deps)) {
        memorizedRef.current = {
            lastDeps: deps,
            value: callback()
        }
    }

    useEffect(() => {

        return () => {
            memoizedRef.current = null;
        }
    }, [])

    return memorizedRef.current.value;
}