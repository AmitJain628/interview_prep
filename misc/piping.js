let test = {  
    a: {  
        b: (a, b, c) => a + b + c,  
        c: (a, b, c) => a + b - c,  
    },  
    d: (a, b, c) => a - b - c,  
    e: 1,  
    f: true  
};  

const pipe = (obj) => {
    return function(...args) {
        for(let key in obj) {
            const value = obj[key];
            if(typeof value === 'function') {
                obj[key] = value(...args);
            } else if(typeof value === 'object' && value !== null) { 
                obj[key] = pipe(value)(...args)
            }
        }
        return obj;
    }
}

console.log(pipe(test)(1, 1, 1));  

