function useIdle(delay) {

    const [idle, setIdle] = useState(false);
    const timeout = useRef();

    useEffect(() => {
        setup();
        return () => {
            cleanup();
        };
    }, []);

    const startTimer = () => {
        timeout.current = setTimeout(goInactive, delay);
    }

    const resetTimer = () => {
        clearTimeout(timeout.current);
        goActive();
    }

    const goInactive = () => {
        setIdle(false);
    }

    const goActive = () => {
        setIdle(true);
        startTimer()
    }

    const setup = () => {
        document.addEventListener('mousedown', resetTimer, false);
        document.addEventListener('mousemove', resetTimer, false);
        document.addEventListener('keypress', resetTimer, false);
        document.addEventListener('mousewheel', resetTimer, false);
        document.addEventListener('touchmove', resetTimer, false);
        document.addEventListener('touchdown', resetTimer, false);
        document.addEventListener('DOMMouseScroll', resetTimer, false);

        window.addEventListener('blur', startTimer, false);
        window.addEventListener('focus', resetTimer, false);
    }

    const cleanup = () => {
        document.removeEventListener('mousedown', resetTimer);
        document.removeEventListener('mousemove', resetTimer);
        document.removeEventListener('keypress', resetTimer);
        document.removeEventListener('mousewheel', resetTimer);
        document.removeEventListener('touchmove', resetTimer);
        document.removeEventListener('touchdown', resetTimer);
        document.removeEventListener('DOMMouseScroll', resetTimer);

        window.removeEventListener('blur', startTimer);
        window.removeEventListener('focus', resetTimer);   
    }

    return idle;
}