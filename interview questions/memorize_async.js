function memorize(fn) {
    let promiseQueue = {};
    let map = new Map();
    return function(key) {
        return new Promise((resolve, reject) => {
            if (map.has(key)) {
               return resolve(map.get(key));
            }

            if (!promiseQueue.has(key)) {
                promiseQueue[key] = [[resolve, reject]]
            } else {
                promiseQueue[key].push([resolve, reject]);
                return;
            }

            fn(key).then((res) => {
                map.set(key, res)
                for(let [resolve, _] of promiseQueue[key]) {
                    resolve(res);
                }

            }).catch(error => {
                for(let [_,  reject] of promiseQueue[key]) {
                    reject(res);
                }
            }).finally(() => {
                delete promiseQueue[key];
            });
        })


    }
}