const asyncFnc = (delay) => {
   return new Promise((resolve, reject) => {
    setTimeout(() => {
        reject('success');
    }, delay)
   });
}

const retryNTries = (task, delay) => {
    let attempts = 0;
    const maxAttempts = 3;

    const retry = async () => {
        attempts++;
        try {
            return await task(delay);
        } catch (error) {
            if (attempts >= maxAttempts) {
                throw error;
            }
            console.log(`Attempt ${attempts} failed, retrying...`);
            return retry();
        }
    };

    return retry();
}

const retryNTriesPromise = (task, remainingRetries) => {
    return new Promise((resolve, reject) => {
        Promise.resolve(task()).then(resolve).catch(error => {
            console.log("error", error, remainingRetries);
            if (remainingRetries === 0) {
               return reject(error);
            }
            retryNTriesPromise(task, remainingRetries -1).then(resolve).catch(reject);
        })
    })
}

const executeTaskWithRetry = async () => {
    const task = () => asyncFnc(500); // Task that fails
    try {
      const result = await retryNTriesPromise(task, 3); // Retry up to 3 times
      console.log("Task completed successfully:", result);
    } catch (error) {
      console.log("Final error after retries:", error);
    }
  };
  
  executeTaskWithRetry();


  const retryN = (fn, retry, delay) => {
    return new Promise((resolve, reject) => {
        Promise.resolve(fn()).then(resolve).reject((error) => {
            if (retry === 0) {
                reject(error);
            }

            wait(delay).then(() => {
               return retryN(fn, --retry. delay);
            }).then(resolve).catch(reject);
        })
    })
  }

  return new Promise((resolve, reject) => {
    return Promise.resolve(fn).then(resolve).catch((error) => {
        if (retry === 0) {
            reject(error);
        }

        retryNTriesPromise(retry -1, fn).then(resolve).catch(error)
    })
  })