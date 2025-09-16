const arr = [
    ["lion", "cat"],
    ["cat", "mammal"],
    ["dog", "mammal"],
    ["mammal", "animal"],
    ["fish", "animal"],
    ["shark", "fish"],
  ];
  
  console.log(ancestry(arr));

  function ancestry(arr){
    let hash = {};
    let res = []
    for(let ele of arr) {
        hash[ele[0]] = ele[1];
    }
    console.log(hash);

    for(let i=0; i<arr.length; i++) {
        let str = '';
        const {child, parent} = arr[i];
        str += `${parent} -> ${child}`;

        while(hash[parent]) {
            str = `${hash[parent]} -> ${str}`;
            parent = hash[parent]
        }

        res.push(str);
    }

    return res;
  }