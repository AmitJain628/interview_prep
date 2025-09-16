// return value after all promises have been settled either resolved or rejected
// This approach ensures that every API response is accounted for, even if some fail.

const settled = function(promises) {
   const map = promises.map((promise) => {
        return Promise.resolve(promise)
        .then(value => ({ status: 'fulfilled', value }))
        .catch(error => ({ status: 'rejected', error }));
    })

    return Promise.all(map);
}

const p1 = new Promise((resolve, reject) => { 
    setTimeout(() => resolve('p1'), 500)
 })
 
 const p2 = new Promise((resolve, reject) => { 
    setTimeout(() => resolve('p2'), 200)
 })
 
 const p3 = new Promise((resolve, reject) => { 
    setTimeout(() => reject('p3'), 100)
 })

 settled([p1, p2, p3]).then(res => {
     console.log(res); // 'p1'
 }).catch(err => console.error(err))