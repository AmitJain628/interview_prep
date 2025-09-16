async function executeInSeries (promises) {
    for (let promise of promises) { 
        try {
            let result = await promise;
        } catch (e) {
            console.error(`Error executing promise: ${e}`);
        }
    }
}

async function executeInSeriesReduce (promises) {
    return promises.reduce((acc, curr) => {
       return acc.then(() => {
           return curr.then((val) => console.log(val));
        });
    }, Promise.resolve())
}