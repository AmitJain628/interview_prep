const JSONStringify = (obj) => { 
    const isArray = (val) => Array.isArray(val);
    const isObject = val => Object.prototype.toString.call(val) === '[object Object]';
    const isString = (val) => typeof val === 'string';
    const isNumber = (val) => typeof val === 'number';
    const isBoolean = (val) => typeof val === 'boolean';
    const isNotNumber = (value) => {
        return typeof value === 'number' && isNaN(value);
      };
    
      const isInfinity = (value) => {
        return typeof value === 'number' && !isFinite(value);
      };
    
      const isNull = (value) => {
        return value === null && typeof value === 'object';
      };
    
      const nullDataTypes = (value) => {
        return isNotNumber(value) || isInfinity(value) || isNull(value);
      }
      const isUndefined = (value) => {
        return value === undefined && typeof value === 'undefined';
      };
    
      const isFunction = (value) => {
        return typeof value === 'function';
      };
    
      const isSymbol = (value) => {
        return typeof value === 'symbol';
      };
    
      const ignoreDataTypes = (value) => {
        return isUndefined(value) || isFunction(value) || isSymbol(value);
      };
    
      const isDate = (value) => {
        return value instanceof Date;
      }

    if(isDate(obj)) {
        return `"${obj.toUTCString()}"`
    }
      
    if(nullDataTypes(obj)) {
        return `${null}`
    }
    if(isString(obj) || isBoolean(obj) || isNumber(obj)) {
        const quotes = isString(obj) ? `"` : `'`;
        return `${quotes}${obj}${quotes}`;
    }

    if(isArray(obj)) {
        let res = '';
        obj.forEach((item) => {
            res += `${JSONStringify(item)},`;
        });

        return `[${res.slice(0, -1)}]`;
    }

    if(isObject(obj)) {
        let res = '';
        for (key in obj) {
            if(obj.hasOwnProperty(key)) {
                // console.log(key, obj[key]);
                res += !ignoreDataTypes(obj[key]) ? `${JSONStringify(key)}:${JSONStringify(obj[key])},` : '';
            }
        }

          return `{${res.slice(0, -1)}}`
    }
}

if (!window.JSON) {
  window.JSON = {
    stringify: function (obj) {
      // Handle primitive types, arrays, and objects
      if (obj === null || obj === undefined) {
        return String(obj);
      }

      if (typeof obj === "number" || typeof obj === "string" || typeof obj === "boolean") {
        return String(obj);
      }

      if (Array.isArray(obj)) {
        let arr = [];
        for (let i = 0; i < obj.length; i++) {
          arr.push(window.JSON.stringify(obj[i]));
        }
        return "[" + arr.join(",") + "]";
      }

      // Handle objects
      let keys = Object.keys(obj);
      let str = [];
      for (let key of keys) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          str.push(
            `"${key}":${window.JSON.stringify(obj[key])}`
          );
        }
      }
      return `{${str.join(",")}}`;
    },
  };
}


const obj = { x: 5, y: 6 };
console.log(JSONStringify(obj));
// expected output: "{"x":5,"y":6}"

const sampleObj = {
    name: 'Sid',
    age: 29,
    engineer: true,
    expertise: ['html', 'css', 'react'],
    address: {
      city: 'New york',
      state: 'NY'
    }
  };
  
  console.log(JSONStringify(sampleObj));

  console.log(JSONStringify(1));
  
  /* 
    This is what it returns for above obj: 
    {"name":"Sid","age":29,"engineer":true,"expertise":["html","css","react"],"address":{"city":"New york","state":"NY"}}
  */