Promise.prototype.all = function(promises) {
    return new Promise((resolve, reject) => {
        let result = [];
        let completed = 0;
        promises.forEach(promise, index => {
            Promise.resolve(promise).then((res) => {
                result[index] = res;
                completed++;
                if (completed === promises.length) {
                    resolve(result)
                }
            }).catch((error) => {
                reject(error);
            }) 
        });
    })
}