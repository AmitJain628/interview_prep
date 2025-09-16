const race = (promises) => {
    return new Promise((resolve, reject) =>{
        promises.forEach(promise => {
            Promise.resolve(promise)
            .then(resolve)
            .catch(reject);
        });
    });
}


const p1 = new Promise((resolve, reject) => { 
    setTimeout(() => resolve('p1'), 500)
 })
 
 const p2 = new Promise((resolve, reject) => { 
    setTimeout(() => reject('p2'), 200)
 })
 
 const p3 = new Promise((resolve, reject) => { 
    setTimeout(() => reject('p3'), 100)
 })

 race([p1, p2, p3]).then(res => {
     console.log(res); // 'p1'
 }).catch(err => console.error(err))