const obj = {
    A: "12",
    B: 23,
    C: {
      P: 23,
      O: {
        L: 56
      },
      Q: [1, 2]
    }
};

const flatten = (input) => {
    const output = {};

    const processObject = (obj) => {
        for (let key in obj) {
            if (typeof obj[key] === 'object' && !Array.isArray(obj[key]) && obj[key] !== null) {
                processObject(obj[key]);
            } else {
                output[key] = obj[key];
            }
        }
   }

   processObject(input);
    return output;
}

const flattenParent = (obj, parentKey = '', result ={}) => {
    for (let key in obj) {
        const propName = parentKey ? `${parentKey}.${key}` : key;
        if (typeof obj[key] === 'object' && !Array.isArray(obj[key]) && obj[key] !== null) {
            flattenParent(obj[key], propName, result);
        } else {
            result[propName] = obj[key];
        }
    }

    return result;
} 

console.log(flattenParent(obj));