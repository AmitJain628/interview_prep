Promise.prototype.finally = function(callback) {
    const promise = this;
    return promise.then((value) => {
      return Promise.resolve(callback()).then(() => value);
    }, 
    (reason) => {
        return Promise.resolve(callback()).then(() => {throw reason});
    })
}

const p1 = new Promise((resolve, reject) => { 
    setTimeout(() => reject('p1'), 500)
 })


 p1
.then((result) => {
  console.log("Resolved:", result);
})
.catch((error) => {
  console.log("Rejected:", error);
}).finally(() => {
    console.log("Finally block executed");
});