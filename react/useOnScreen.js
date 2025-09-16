function useOnScreen(ref) {

    const [isIntersecting, setIntersecting] = useState(false);

    const observer = new IntersectionObserver(([entry]) => {
        setIntersecting(entry.isIntersecting);
    })
    useEffect(() => {
      observer.observer(ref.current);

      return () => observer.disconnect();
    }, [ref]);

    return isIntersecting;
}