async function  getAllLinks(url) {
    let queue = [url];
    let res = [];
    let set = new Set();

    while(queue.length) {
        let arr = [...queue];
        queue = [];

        await Promise.all(arr.map(async (url) => {
            if (set.has(url)) {
                return;
            }

            set.add(url);
            const urls = await getAllLinks(url);
            for (let el of urls) {
                if(!set.has(el)) {
                   queue.push(el);
                   set.add(el);
                }
            }
        }))
    }

  
}