let num1 = 10;
let num2 = 20;
[num1, num2] = [num2, num1]


 //Write a function which returns true if given value of number is an integer without using any inbuilt functions
!isNaN(num1)
typeof num1 === "number" && typeof num1 !== "object"

num1 % 1 === 0

//. Create a function which returns a random number in the given range of values both inclusive
function get(r1, r2) {
  return r1 + Math.round(Math.random() * (r2 - r1))
}


//4. Write a program to reverse a string
str.split('').reverse().join()

// 5. Write a program to reverse a string by words. Also show the reverse of each words in place

//let num = 3849;
Number(String(num).split('').reverse().join(''))


//convertTo24HrsFormat("12:10AM"); // 00:10
// 
function convertTo24HrsFormat(time) {
    const arr = time.split(":");
    let isAm = false;
    let hours;
    if (arr[1].indexOf("AM") !== -1) {
        isAm = true;
    }

    if (isAm) {
        hours = arr[0] === "12" ? "00" : arr[0]
    } else {
        hours = arr[0] === "12" ? arr[0] : 12 + Number(arr[0])
    }

    const mins = arr[1];


    return `${hours}:${mins.slice(0, -2)}`
}

// polyfill for bind

Function.prototype.bind = function(context, ...args) {
    const fn = this;
    return function (...args1) {
        fn.apply(context, [...args, ...args1])
    }
}

// overirde

Function.prototype.bind = function(fn, context, ...args) {
    return function (...args1) {
        var finalContext = !this || this === window ? context : this;
        fn.apply(finalContext, [...args, ...args1])
    }
}

// currying
function currying(fn) {
    let res = []
    return function curry(...args) {
        res = [...args, ...res];
        if (fn.length === res.length) {
           return fn.apply(this, res)
        } else {
            return function(...nextArgs) {
                return curry(...nextArgs)
            }
        }
    }
}

var singleton = (function() {

    let instance;

    function createInstance() {
        return {

        }
    }

    return {
        getInstance: function() {
            if (!instance) {
                instance = createInstance();
            }
            return instance;

        }
    }
})()


function toggle(...args) {
    let index = -1
    return function() {
      index = (index + 1) % args.length;
      return args[index]
    }
}


function(start, end) {
    if (!end) {
        return function() {
            return Range(start, end)
        }
    }
}

// deep copy

function deepCopy(obj) {
    let newObj = {};
    for(let key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (Object.prototype.toString.call(obj[key]) === "[Object object]") {
                newObj[key] = deepCopy(obj[key])
            } else {
                newObj[key] = obj[key];
            }
        }
    }

    return newObj;
}

const obj = { marks: 0 };


obj = new Proxy(obj, {
    get: function(props, key) {

    },
    set: function(props, key, value)
})

Object.defineProperties(obj, "marks", {
    get: function(key) {
       return marks
    },
    set: function(value) {
        if (value > 0) {

        }
    } 
})

var obj1 =  {
    id: 1,
    get: function() {
        console.log("get");
        return this;
    }
}

// 


function myNew(parent, ...args) {
   let obj = {};


   Object.setPrototypeOf(obj, parent);

   parent.apply(obj, args);

   return obj;
}

Object.setPrototypeOf = function(obj, parent) {
     obj.__proto__ = parent;

     return obj;
}

// Example
const obj1 = {
    name: "John",
    details: {
      x: 1,
      y: 2,
    },
  };
   
  const obj2 = {
    name: "John",
    details: {
      y: 2,
      x: 1,
    },
  };
   
  deepEqual(obj1, obj2); // true

  function deepEqual(obj1, obj2) {
    if (Object.keys(obj1).length !== Object.keys(obj2).length) {
        return false;
    }


    for(let key in obj1) {
        if(Object.prototype.toString.call(obj1[key]) === "[Object object]" && Object.prototype.toString.call(obj2[key]) === "[Object object]") {
            return deepEqual(obj1[key], obj2[key])
        } else if (obj1[key] !== obj2[key]) {
            return false;
        }
    }


    return true;
  }

  // seal vs freeze
  // seal -> Object.seal(obj1) // no addition and no modify
  // freeze -> // no addition but modify alloweed

  let range = {
    start: 10,
    end: 50,
  };
   
  5 in range; // false
  25 in range; // true


  range = new Proxy(range, {
    has: function(target, value) {
       return  value > range.start && value < range.end
    }
  })

  new Array(10).fill().map(i => i);

  function flatten(arr){
    let res = [];

    for(let el of arr) {
        if (Array.isArray(el)) {
            res.push(...flatten(el))
        } else {
            res.push(el);
        }
    }


    return res;
  }