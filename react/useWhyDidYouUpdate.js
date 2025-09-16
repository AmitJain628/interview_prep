function useWhyDidYouUpdate(name, props) {
      let previousProps = useRef();

      useEffect(() => {
        if (previousProps.current) {
            const keys = Object.keys({...previousProps.current, ...props});
            let changes = {};
            keys.forEach(key => {
                if(typeof props[key] !== 'object') {
                   if(JSON.stringify(props[key]) !== JSON.stringify(previousProps.current[key])) {
                    changes[key] = {
                        previousValue: previousProps.current[key],
                        currentValue: props[key]
                    }
                   }
                } else {
                    if(previousProps.current[key] !== props[key]) {
                        changes[key] = {
                            previousValue: previousProps.current[key],
                            currentValue: props[key]
                        }
                    }
                }
            });

            if(Object.keys(changes).length) {
                console.log(`Why did ${name} update?`, changes);
            }
        }
        previousProps.current = {...props};
      }, [props])
}