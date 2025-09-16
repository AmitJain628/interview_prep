// Promise.any() -> Accept an array of promises, return first resolved promise and if all promises rejected then return array of rejected promises promise.

const myAny = function (promises) {
    let counter = 0;
    const errors = [];
    return new Promise((resolve, reject) => {
        promises.forEach((promise => {
            Promise.resolve(promise).then(resolve).catch(error =>{
              errors[counter++] = error;
              if(counter === promises.length) {
                reject(errors);
              }
            });
        }))
    })
}

const p1 = new Promise((resolve, reject) => { 
   setTimeout(() => resolve('p1'), 500)
})

const p2 = new Promise((resolve, reject) => { 
   setTimeout(() => reject('p2'), 200)
})

const p3 = new Promise((resolve, reject) => { 
   setTimeout(() => reject('p3'), 400)
})

myAny([p1, p2, p3]).then((res) => {
    console.log(res); // 'p1'
}).catch(err => console.error(err))