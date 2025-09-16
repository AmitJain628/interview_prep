function useValueAsync(asyncFn, immediate = false) {
    const [state, setState] = useState("idle");
    const [error, setError] = useState();
    const [value, setValue] = useState();

    const refetch  = useCallback(async () => {
       setState("pending");
       setError(null);
       
       try {
        const data = await asyncFn();
        setState("succes");
        setValue(data);
       } catch (error) {
        setError(error);
        setState("error");
       }
    }, [asyncFn])

    useEffect(() => {
        if (immediate) {
            refetch();    
        }
    }, [immediate, asyncFn])

    return {
        state, value, error, refetch
    }
}