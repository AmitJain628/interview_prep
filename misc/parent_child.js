const input = [
  ["lion", "cat"],
  ["cat", "mammal"],
  ["dog", "mammal"],
  ["mammal", "animal"],
  ["fish", "animal"],
  ["shark", "fish"]
];

function parentChild(input) { 
  const relationShip =  input.reduce((res, curr) => {
           const [child, parent] = curr;
           res[child] = parent;

           return res;
    }, {});

    const result = [];

    for (const child in relationShip) {
        let parent = relationShip[child];
        let relation = `${parent} -> ${child}`;
        while(relationShip[parent]) {
            parent = relationShip[parent];
            relation = `${parent} -> ${relation}` ;
        }

        result.push(relation);
    }

    return result;
}

console.log(parentChild(input));