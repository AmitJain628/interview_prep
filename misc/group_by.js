const groupBy = function(arr, groupBy) {
   return  arr.reduce((result, curr) => {      
        const key = typeof groupBy === 'function' ? groupBy(curr) : groupBy[curr];
        if (!result[key]) {
            result[key] = [];
        }
        result[key].push(curr);

      return result;
    }, {}); 
}

const data = [
    { name: 'John', age: 25 },
    { name: 'Jane', age: 30 },
    { name: 'Peter', age: 25 },
    { name: 'Sarah', age: 30 },
    { name: 'Paul', age: 35 }
];

const groupedByAge = groupBy(data, item => item.age);

console.log(groupedByAge);