function delay(delay) {
    return new Promise((resolve) => {
      setTimeout(() => resolve('done'), delay);
    });
  }
  
  function retryApiCall(apiFunction, maxRetries, retryInterval) {
    return new Promise((resolve, reject) => {
      const attempt = (retries) => {
        apiFunction()
          .then(resolve)
          .catch((error) => {
            if (retries === 0) {
              reject(new Error("Max retries reached"));
            } else {
              delay(retryInterval)
                .then(() => attempt(retries - 1))
                .catch(reject); // in case delay fails, propagate error
            }
          });
      };
      
      attempt(maxRetries);
    });
  }
  