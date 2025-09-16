function useScript(src) {
    const [status, setStatus] = useState("idle");
    
    useEffect(() => {
       const existingScript = document.querySelector(`script=[src="${src}"]`);
       if (existingScript) {
            setStatus("ready");
            return;
       } else {
        const script = document.createElement("script");
        script.src = src;
        script.async = true;
        script.onload = () => setStatus("ready");
        script.onerror = () => setStatus("error");

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
            setStatus("idle");
        };
       }
    }, [src]);

    return status;
}