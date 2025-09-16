
let obj1 = {a:1, c:3, e: {d: 4, x: [1, 2, 3]}};
let obj2 = {a:1, c:3, e: {d:4, x: [1, 2, 3]}};

//console.log(JSON.stringify(obj1) === JSON.stringify(obj2)); // true


const compare = function(obj1, obj2) {
    const key1Length = Object.keys(obj1).length;
    const key2Length = Object.keys(obj2).length;

    if (key1Length!== key2Length) {
        return false;
    }

    for(const key of Object.keys(obj1)) {
        const obj1Val = obj1[key];
        const obj2Val = obj2[key];
        
        const isObject = typeof obj1Val === 'object' && typeof obj2Val === 'object';
        console.log("test", obj1Val, obj2Val, isObject);

        if (isObject) {
            if (!compare(obj1Val, obj2Val)) {
                return false;
            }
        } else if (!isObject && obj1Val !== obj2Val) {
           return false;
        } 
    }

    return true;
}

console.log(compare(obj1, obj2)); // true