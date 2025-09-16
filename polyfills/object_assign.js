Object.assign = function(target, ...source) {
    if (target === null || typeof target !== "object") {
        throw new TypeError("")
    }

    target = Object(target);

    const merge = (target, source) => {
        for(let key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
                if (Array.isArray(source[key])) {
                 target[key] = [...source[key]];
                }
                 else if (Object.prototype.toString.call(source[key]) === "[object Object]" && Object.prototype.toString.call(target[key]) === "[object Object]" )  {
                   target[key] = merge(target[key], source[key]);
                } else {
                    target[key] = obj[key];
                }
            }
            
        }

        return target;
    }

    for(let i =0; i<source.length; i++) {
        let obj = source[i];
        if (obj != null) {
            merge(target, obj);
        }
    }

    return target;
}