function promiseNRetry(promises) {
    promises.sort((a, b) => a.priority - b.priority);
    let result = [];
    let reject = [];
    let mostPriorty = 0;
    let completed = 0;
    return new Promise((resolve, reject) => {
        promises.forEach((element, index) => {
             Promise.resolve(element.task).then((value) => {
                  result[element.priority] = value;
             }).catch((error) => {
                reject[element.priority] = true;
                if (mostPriorty === element.priority) {
                    mostPriorty++;
                }
             }).finally(() => {
                completed++;
                if (!rejected[element.priority] && element.priority === promises[mostPriorty].priority) {
                    resolve(priority)
                }

                if (completed === promises.length) {
                    reject('all API failed');
                }
             })
        });
    })
}