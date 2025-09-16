function useResponsive() {
    const [state, setState] = useEffect({
        isMobile: false,
        isDesktop: false,
        isTablet: false,
    });

    const resizeHandler = () => {
        const isMobile = window.innerWidth <= 760;
        const isTable = window.innerWidth >= 760 && window.innerWidth <= 990;
        const isDesktop = window.innerWidth >= 990;

        setState({
            isMobile,
            isDesktop,
            isTablet,
        });
    }

    useEffect(() => {
        resizeHandler();
        window.addEventListener('resize', resizeHandler);
        return () => window.removeEventListener('resize', resizeHandler);
    }, []);
}
// we can use useDebounce to avoid multiple times resize handler to call as user keeps resizing