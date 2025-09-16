function promisify(callback) {
   return function(...args) {
     let context = this;
    return new Promise((resolve, reject) => {
          callback.call(context, ...args)
    })
   }
}