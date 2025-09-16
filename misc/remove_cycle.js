const removeCycle = function(obj) {
    const set = new WeakSet([obj]);
    (function iterateObj(obj){
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (typeof key === "object") {
                if (set.has(key)) {
                    delete obj[key];
                } else {
                    set.add(obj[key]);
                    iterateObj(obj[key]);
                }
            }
        }
      }
    })(obj);
}

const List = function (val) {
    this.next = null;
    this.val = val;
  };
  
  const item1 = new List(10);
  const item2 = new List(20);
  const item3 = new List(30);
  
  item1.next = item2;
  item2.next = item3;
  item3.next = item1;
  
  removeCycle(item1);
  console.log(item1);


  // use json strigify

  const getCircular = function () {
    const set = new WeakSet([obj]);
    return () => function (key, value) {
      if (typeof value === 'object' && value !== null) {
        if (set.has(value)) {
            return;
        }
        set.add(value); 
      }

      return value;
    }
  }

  JSON.stringify(item1, getCircular())


  const removeCyle = (obj) => {
    let seen = new WeakSet();

    (function iterate() {
      for(let key in obj) {
          if(obj.hasownProperty(key)) {
              if(typeof obj[key] === 'object') {
                  if(seen.has(obj[key])) {
                      delete obj[key];
                  } else {
                      seen.add(obj[key]);
                      iterate(obj[key]);
                  }
              }
          }
      }
    })(obj)
}