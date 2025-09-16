const expensiveFunction = () => {
    console.log("you made expenisve call");
  }
  const throttleFunc = throttle(expensiveFunction, 3000);


  function throttling(fn, delay) {
    let lastRan;
    let timerId;  
    return function(...args) {
        let context = this;
        if (!lastRan) {
            lastRan = Date.now();
            fn.apply(context, args);
            return;
        }
        clearTimeout(timerId);
        timerId = setTimeout(() => {
            if (Date.now() - lastRan > delay) {
                clearTimeout
                fn.apply(context, args);
            }
        }, delay - (Date.now() - lastRan))
    }
  }


  function throtling(fn, delay, options ={leading: true, trailing: false}) {
    let timerId;
    let lastArgs;

    return function(...args) {
        let context = this;

        const wait = () => {
                if (lastArgs && options.trailing) {
                    fn.apply(context, lastArgs);
                    lastArgs = null;
                    timerId = setTimeout(wait, delay);
                } else {
                    timerId = null;
                }
        }

        if(!timerId && options.leading) {
            fn.apply(context, args);
        } else {
            lastArgs = args;
        }
        
        if (!timerId) {
            timerId = setTimeout(wait, delay);
        }
    }
  }

  A ---- C

  function throtle(fn, delay, options = {leading: true, trailing: false}) {
        let timerId;
        let lastArgs;

        return function(...args) {
            let context = args;
            const wait = () => {
                   if (lastArgs && trailing) {
                       fn.apply(context, lastArgs);
                       timerId = null;
                       timerId = setTimeout(wait, delay)
                   } else {
                    timerId = null;
                   }
            }

            if (!timerId && leading) {
                fn.apply(context, args)
            } else {
                lastArgs = args;
            }

            if (!timerId) {
                timerId = setTimeout(wait, delay);
            }

        }
  }