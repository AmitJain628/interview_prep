import { useRef } from "react";

function useEffect(fn, deps) {
    let depsRef = useRef([]);
    let firstTime = useRef(false);

    if(!firstTime.current) {
         firstTime.current = true;
         let cleanup = fn();
         if (cleanup && typeof cleanup === "function") {
            cleanup();
         }
    }

    if(JSON.stringify(deps) !== JSON.stringify(depsRef.current)) {
        let cleanup = fn();
        if (cleanup && typeof cleanup === "function") {
           cleanup();
        }
    }

    if (!deps) {
        let cleanup = fn();
        if (cleanup && typeof cleanup === "function") {
           cleanup();
        }
    }

    depsRef.current = deps ? deps : [];
}