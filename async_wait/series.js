
const asyncTask = (value) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(value);
        }, 100);
    });
}

const series = [
    asyncTask(200),
    asyncTask(500),
    asyncTask(300),
]

const asyncExecution =  async (series) => {
    for (let promise of series) {
        try {
         const res = await promise;
         console.log(res);
        } catch (err) {
        }
     }
}

// asyncExecution(series);


const asyncUsingReduce = async (series) => {
    series.reduce((acc, curr) => {
       return acc.then((() => curr.then(val => console.log(val))))
    }, Promise.resolve())
}

// asyncUsingReduce(series);

const asyncExecuteInParallel = async (series) => {
    try {
        const res = await Promise.all(series);
        console.log(res);
       } catch (err) {
       }
}