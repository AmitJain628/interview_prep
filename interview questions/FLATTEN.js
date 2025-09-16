function flat (arr) {
    let resul = [];
    function flatten(arr) {
        for(let el of arr) {
            Array.isArray(el) ? flatten(el) : resul.push(el);
        }
    }
    flatten(arr);
    return resul;
}

console.log(flat([[[1, [1.1]], 2, 3], [4, 5]]))


function asyncFunc1(callback) {
    setTimeout(() => {
      callback(1);
    }, 3000);
  }
   
  function asyncFunc2(callback) {
    setTimeout(() => {
      callback(2);
    }, 2000);
  }
   
  function asyncFunc3(callback) {
    setTimeout(() => {
      callback(3);
    }, 1000);
  }
   
  asyncParallel([asyncFunc1, asyncFunc2, asyncFunc3], (result) => {
    console.log(result); // 1, 2, 3 (prints results of each asynchronous function in order)
  });

  async function asyncParallel(promises, callback) {
    try {

     promises.map(fn => new Promise(resolve => {
        fn(result => resolve(result))
     }))   

    let res = await Promise.all(promises);
    callback(res);
    } catch(error) {

    }

  }

  promises.map(promise.then(res => {resolve: res, }).catch(error => {reject: error}))