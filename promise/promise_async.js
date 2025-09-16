function asyncFilter(tasks, iterate) {
    return new Promise((resolve, reject) => {
        let results = [];
        let completed = 0;
        let flags = new Array(tasks);

        tasks.forEach((element, i) => {
            iterate(element, (err, result) => {
                if (err) {
                    reject(err)
                }
                flags[i] = result;
                completed++
                if (completed == tasks.length) {
                    const filtered = tasks.filter((_, i) => flags[i]);
                    resolve(filtered);
                }
            })
        });
    })
}

const items = [1, 2, 3, 4, 5];

function isEvenWithCallback(item, callback) {
  setTimeout(() => {
    callback(null, item % 2 === 0);
  }, Math.random() * 1000);
}

asyncFilter(items, isEvenWithCallback).then((filtered) => {
  console.log(filtered); // Output: [2, 4]
});
