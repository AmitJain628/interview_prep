

const filter = (arr, test) => {
    const output = [];
    for (let element of arr) {
          if(Array.isArray(element)) {
              const res = filter(element, test);
              output.push(res);
          } else {
            if(test(element)) {
              output.push(element);
            }
          }
    }

    return output;
}

const arr = [[1, 2], [3, 'foo', { 'a': 1, 'b': 2}], 'bar'];
const filtered = filter(arr, (e) => typeof e === 'number');
console.log(JSON.stringify(filtered));