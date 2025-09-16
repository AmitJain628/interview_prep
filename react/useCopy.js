function useCopy() {
    const [copyText, setCopyText] = useState("");

    const copy = async (text) => {
        if (!window.navigator.clipboard) {
            return;
        }

       try {
       const res =  await window.navigator.clipboard.writeText(text);
       setCopyText(res);
       } catch (err) {
           console.error("Could not copy text: ", err);
           setCopyText()
       }
    }


    return [copyText, copy];
}