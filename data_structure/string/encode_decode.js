function encode(strings) {
    let encode = ''
    for (char of strings) {
        encode += `${char.length}#${char}`
    }

    return encode
}

function decode(str) {
    const result = [];
    let i = 0;

    while (i < s.length) {
        const delimiterIndex = s.indexOf("#", i);
        const length = parseInt(s.slice(i, delimiterIndex), 10);
        const str = s.slice(delimiterIndex + 1, delimiterIndex + 1 + length);
        result.push(str);

        i = delimiterIndex + 1 + length;
    }

    return result;
}