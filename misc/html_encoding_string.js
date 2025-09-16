function htmlEncoding(str, arr) {
    arr.sort((a,b) => a[0] - b[0]);
    let result = '';
    let currentIndex = 0;

    for(let i=0; i<arr.length; i++) {
        const [start, end, tag] = arr[i];

        result += str.slice(currentIndex, start);

        result += `<${tag}>${str.slice(start, end)}</${tag}>`;

        currentIndex = end;
    }

    return result;
}