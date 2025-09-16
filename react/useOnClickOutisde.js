function useOnClickOutside(ref, callback) {
  useEffect(() => {
    
    const listerner = (event) => {
        if(!ref.current || ref.current.contains(event.target) ) {
            return;
        }
        callback(event)
    }

    document.addEventListener('mousedown', listerner);
    document.addEventListener('touchdown', listerner);

    return () => {
        document.removeEventListener('mousedown', listerner);
        document.removeEventListener('touchdown', listerner);            
    }
  }, [ref, callback]);
}