function capture() {
    const ref = useRef();
    const timer = useRef({})
    const checkInViewPort = (element) => {
         const bounding = element.getBoundingClientRect();
         return (
            bounding.top >=0 &&
            bounding.left >=0 &&
            bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
         )
    }

    const checkVisibility = (element) => {
       if(ref.current) {
        Array.from(ref.current.children).forEach((element) => {
            if (checkInViewPort(element)) {
                if (!timer.current[element.id]) {
                    timer.current[element.id] = setTimeout(() => {
                        if (checkInViewPort(element)) {
                            makeApiCall();
                        }
                    }, 5000);
                } else {
                    clearTimeout(timer.current[element.id]);
                    delete timer.current[element.id];
                }
                // call an api
            } else {

            }
         })
       }
    }

    const makeApiCall = () => {
        if (ref.current) {
            Array.from(ref.current.children).forEach(child => {
               if (checkInViewPort(child)) {
                 // call an api
               }
            });
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', checkVisibility);
        return () => window.removeEventListener('scroll', checkVisibility);
    })
}