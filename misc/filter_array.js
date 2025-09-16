const filterObject  = (arr, filter) => {
    if (typeof filter === 'string') {
        for (element of arr) {
            for (const key in element) {
                if (element[key] === filter) {
                    return element
                }
            }
        };
    } 
    else if (typeof arr[filter] !== 'undefined') {
        return arr[filter] ;
    }

    return undefined
}

const arr = [
    { name: "Amir", id: "1" },
    { name: "Samlan", id: "2" },
    { name: "Shahrukh", id: "0" }
  ];
  
  console.log(filterObject(arr, 0)); // { name: "Amir", id: "1" }
  console.log(filterObject(arr, "Amir")); // { name: "Amir", id: "1" }
  console.log(filterObject(arr, "0")); // { name: "Shahrukh", id: "0" }