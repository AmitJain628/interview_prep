function useHasFocus() {
    const [focus, setFocus] = useState(false);
    
    useEffect(() => {
       
       const onFocus = () => setFocus(true);
       const onBlur = () => setFocus(false);

       window.addEventListener('focus', onFocus);
       window.addEventListener('blur', onBlur);
       
       return () => {
           window.removeEventListener('focus', onFocus);
           window.removeEventListener('blur', onBlur);
       }
    })
}