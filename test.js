const obj1 = { a: 1, b: { x: 10, y: 20 }, c: [1, 2] };
const obj2 = { b: { y: 30, z: 40 }, c: [3, 4], d: 4 };
  
console.log(deepMergeWithArrays({}, obj1, obj2));


function deepMergeWithArrays(dest, ...rest) {
    let args = Array.prototype.slice.call(arguments);
    let dest = arguments[0];
    for(let i= 1; i<arr; i++) {
        merge(dest, arr[i])
    }
    const merge = (dest, obj) => {
           for(let key in obj) {
             if (typeof obj[key] !== "object") {
                dest[key] = obj[key]
            } else if (Array.isArray(obj[key])) {
                dist[key] = [...obj[key]]
            } 
             else {
                dest[key] = {};
                merge(dest[key], obj[key])
             }
           }
    }
}