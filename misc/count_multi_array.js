
const countInArray = (arr, test) => {
    const result = [];
    const search = (arr, test) => {
        for (let element of arr) {
            if (Array.isArray(element)) {
                search(element, test);   
            } else {
                if (test(element)) {
                    result.push(element);
                }
            }
        }
    }
    search(arr, test);
    return result.length;
}


const arr = [[1, 2], [3, 'foo', { 'a': 1, 'b': 2}], 'bar'];
const filtered = countInArray(arr, (e) => typeof e === 'number');
console.log(JSON.stringify(filtered));