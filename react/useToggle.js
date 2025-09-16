function useToggle(arr, index = 0) {
    const [currentIndex, setCurrentIndex] = useState(index);
    const toggle = useCallback(() => {
          setCurrentIndex((previousIndex) => (previousIndex >= arr.length - 1) ? 0 : previousIndex+1)
    }, [arr, index]);

    return {
        toggle,
        index: arr[currentIndex],
    }

}