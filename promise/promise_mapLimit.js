function mapLimit(tasks, limit, mapper) {
   return new Promise((resolve, reject) => {
    let result = [];
    let queue = [...tasks];
    let active = 0;
    let index = 0;

      function next() {
         if (queue.length === 0 && active === 0) {
            return resolve(result);
         }

         while(active < limit && queue.length) {
            let task = queue.shift();
            active++;
            let currentIndex = index++;

            Promise.resolve(mapper(task, currentIndex)).then((res) => {
                active--;
                result[currentIndex] = res;
                next();
            }).catch(err => {
               return reject(err)
            })
         }
      }

      next();


   })
}