// Example usage:
const asyncTask = (task, index) =>
  new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Processed task ${task} at index ${index}`);
      resolve(`Result of task ${task}`);
    }, 500 * task * 10);
  });

const tasks = [1, 2, 3, 4, 5];

const mapSeries = function(tasks, callback) {
   return new Promise((resolve) => {
   const results = [];
   const final = tasks.reduce((acc, task) => {
         return acc.then(() => {
            return new Promise((resolve) => {
                callback(task).then((val) => {
                    results.push(val);
                    resolve(results);
                });
            })
        })
    },Promise.resolve());

    console.log("done", final);
    final.then(() => resolve(results));
   });
}

async function mapSeries(items, mapper) {
  const results = [];
  for (let i = 0; i < items.length; i++) {
    results.push(await mapper(items[i], i));
  }
  return results;
}


mapSeries(tasks, asyncTask)
  .then((results) => {
    console.log("All tasks completed:", results);
  })
  .catch((error) => {
    console.error("Error in processing tasks:", error);
  });