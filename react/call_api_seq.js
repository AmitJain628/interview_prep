const chop = (arr, chunkSize) => {
    let ouput = [];
    let i = 0;

    while(i< arr.length) {
        ouput.push(arr.slice(i, i + chunkSize));
        i = i + chunkSize;
    }
    return ouput;
}

const asyncTask = (i) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(`Task completed ${i}`);
        }, 2000);
    })
}

function Example() {
    const [index, setIndex] = useState(0);
    const arr = chop(seq);
    const operations = async (promises) => {
        try {
        const result = await Promise.all(promises);
        } catch (err) {
            console.error(err);
        } finally {
           setIndex(index < arr.length - 1 ? index + 1 : 0);
        }
    }

    useEffect(() => {
       if (index === 0) {
        setTimeout(() => {
          operations(arr[index])
        }, 500)
       } else {
        operations(arr[index])
       }
    }, [index])
}