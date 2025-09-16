function update(target, command) { 
    if (command === null || typeof command !== "object") {
        throw new Error("can't update the object");
    }

    if ('$push' in command) {
           if (!Array.isArray(target)) {
            throw new Error("not an array")
           }
           
           return [...target, ...command['$push']];
    }

    if ('$merge' in command) {
        if (Object.prototype.toString.call(target) !== '[object Object]') {
            throw new Error("not an object");
        }

        return {
            ...target,
            ...command['$merge']
        }
    }

    if ('$set' in command) {
        return command['$set'];
    }

    if ('$apply' in command) {
         return command['$apply'](target);
    }

    let newData = Array.isArray(target) ? [...target] : {...target};

    for (let key of Object.keys(command)) {
        newData[key] = update(newData[key], command[key]);
    }

    return newData;

}

function deepFreeze(obj) {
    if (Object.prototype.toString.call(obj) !== '[object Object]') {
        return obj;
    }

    Object.freeze(obj);

    for (let key of Object.keys(obj)) {
        obj[key] = deepFreeze(obj[key])
    }

    return obj;
}

console.log(update([1, 2, 3], { $push: [4, 5] })); // [1, 2, 3, 4, 5]

// $set
console.log(update({ a: 1 }, { a: { $set: 2 } })); // { a: 2 }

// Nested $set
console.log(update({ a: { b: { c: 1 } } }, { a: { b: { c: { $set: 3 } } } })); 
// { a: { b: { c: 3 } } }

// $merge
console.log(update({ a: { b: { c: 1 } }, d: 2 }, { a: { b: { $merge: { e: 5 } } } }));