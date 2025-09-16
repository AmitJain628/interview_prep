function promiseInParallel(promises) {
   return Promise.allSettled(promises)
    .then(results => {
      results.forEach(result => {
        if (result.status === 'fulfilled') {
          console.log('Fulfilled:', result.value);
        } else {
          console.error('Rejected:', result.reason);
        }
      });
    });

}