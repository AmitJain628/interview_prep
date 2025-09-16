function TaskRunner() {
    let result = [];
    return {
        series: async function(promises) {
            for (let promise of promises) {
                try {
                 const res = await promise;
                 result.push(res);
                } catch (error) {
                    console.log(error)
                }
            }
            return result;
        },
        parallel: async function(promises) {
            return new Promise((resolve, reject) => {
                let promiseMap = promises.map(el => el());
                Promise.all(promiseMap).then((res) => {
                    resolve(res);
                }).catch((error) => {
                    reject(error)
                })
            })
        },

    }
}