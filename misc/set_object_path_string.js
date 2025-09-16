const obj = {
    a: {
      b: {
        c: [1, 2, 3]
    },
   }
}


const helper = (obj, keys, value) => {
    const [current, ...rest] = keys;

    if (rest.length > 0) {
        if(!obj[current]) {
            const isNumber = rest[0] === `${+rest[0]}`
            obj[current] = isNumber ? [] : {};
        }
        
        if(typeof obj[current] !== 'object') {
            const isNumber = rest[0] === `${+rest[0]}`
            helper(isNumber ? [] : {}, rest, value);
        } else {
            helper(obj[current], rest, value);
        }
    } else {
        obj[current] = value;
    }

    return obj;
}

const set = (obj, path, value) => {
    const keys = Array.isArray(path) ? path : path.replace('[', '.').replace(']', '').split('.');
    helper(obj, keys, value)
}

const abc = {
    a: {
      b: {
        c: [1, 2, 3]
      },
      d: {
        a: "hello"
      }
    }
  };
  
  const instance1 = JSON.parse(JSON.stringify(abc));
  set(instance1, 'a.b.c', 'learnersbucket');
  console.log(instance1, instance1.a.b.c);
  