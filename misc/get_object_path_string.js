const obj = {
    a: {
      b: {
        c: [1, 2, 3]
    },
   }
}



const get = (obj, path) => {
    const keys = Array.isArray(path) ? path : path.replace('[', '.').replace(']', '').split('.');
    let child = obj[keys[0]];
    for(let i = 1; i < keys.length; i++) {
        // console.log(child, keys[i]);
        if (typeof child[keys[i]] !== 'undefined' ) {
            child = child[keys[i]];
        } else {
            return undefined;
        }
    }

    return child;
}

console.log(get(obj, 'a.b.c'));
console.log(get(obj, 'a.b.c.0'));
console.log(get(obj, 'a.b.c[1]'));
console.log(get(obj, 'a.b.c[3]'));
console.log(get(obj, ['a', 'b', 'c', '2']));