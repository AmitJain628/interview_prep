const arr = [1,2,3,4,5,6,7,8,9, 10]
const size = 3;


Array.prototype.chop = function(size) {
    const arr = [...this];
    if (!Array.isArray(arr)) { 
        throw new Error("Not a valid array");
    }

    const result = [];
    let i = 0;

    while( i < arr.length ) {
       result.push(arr.slice(i, i + size));
       i += size;
    }

    return result;
}

console.log(arr.chop(size));