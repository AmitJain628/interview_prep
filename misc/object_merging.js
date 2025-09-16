let shallowMerge = function(...args) {
   let result = {};
   const merger = (obj) => {
    for (let key in obj) {
        if(obj.hasOwnProperty(key)) {
            result[key] = obj[key];
        }
      }
    }
    for (let i=0; i<args.length; i++) {
          merger(args[i]);
    }
    return result;
}
function deepMergeWithArrays(target, ...sources) {
    if (!sources.length) return target;
    const source = sources.shift();

    if (Object.prototype.toString.call(target) === '[object Object]' && Object.prototype.toString.call(source) === '[object Object]') {
        for (let key in source) {
            if (Object.prototype.toString.call(source[key]) === '[object Object]') {
               if(!target[key]) Object.assign(target, {[key]: {}});
               deepMergeWithArrays(target[key], source[key]);
            } else if (Array.isArray(source[key])) {
                if(!target[key]) target[key] = [];
                target[key] = [...target[key], ...source[key]]
            } else {
                Object.assign(target, {[key]: source[key] });
            } 
       }
    }  

    return deepMergeWithArrays(target, ...sources);
}
 
const obj1 = { a: 1, b: { x: 10, y: 20 }, c: [1, 2] };
const obj2 = { b: { y: 30, z: 40 }, c: [3, 4], d: 4 };
  
console.log(deepMergeWithArrays({}, obj1, obj2));