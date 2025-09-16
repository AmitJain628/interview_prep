```
const obj = {
    a: 1,
    b: {
      c: "Hello World",
      d: 2,
      e: {
       f: {
         g: -4,
        },
      },
      h: "Good Night Moon",
    },
  };
  
  const filter = (s) => typeof s === "string";
  
  Output:
  {
    b: {
      c: "Hello World",
      h: "Good Night Moon",
    }
  };

  ```

  const obj = {
    a: 1,
    b: {
      c: "Hello World",
      d: 2,
      e: {
       f: {
         g: -4,
        },
      },
      h: "Good Night Moon",
    },
  };
  
  const filter = (s) => typeof s === "string";
  

  function aggregate(input, filter) {
    let res = {};
    if(typeof input !== 'object' && filter(input)) {
         
    }
    for (let key of input) {
         if(typeof input[key] === 'object') {
            aggregate(input[key], filter);
         } else if(filter(input[key])) {
              res[key] = input[key];
         }
    }

    return res;
  }

  console.log(aggregate(input, filter));