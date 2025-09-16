const useLockedBody = (ref, initallyLocked = false) => {
  const [locked, setLocked] = useState(initallyLocked);

  useLayoutEffect(() => {
       if(!locked) return;

       const originalBodyStyle = document.body.style.overflow;
       const originalPaddingRight = document.body.style.paddingRight;

       document.body.style.overflow = "hidden";
       const root = ref?.current || document.body; // Fallback to body if ref is not provided
       const scollwidth = root ? root.offsetWidth - root.scrollWidth : 0;

       if (scollwidth) {
        document.body.style.paddingRight = `${scollwidth}px`;
       }

       return () => {
        document.body.style.overflow = originalBodyStyle;
        document.body.style.paddingRight = originalPaddingRight;
       }
  }, [locked])


  useEffect(() => {
     if(locked !== initallyLocked) {
        setLocked(initallyLocked);
     }
  }, [initallyLocked])
}