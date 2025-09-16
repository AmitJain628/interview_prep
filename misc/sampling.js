function message() {
    console.log('Hello, World!');
}

const sample = sampler(message, 4);

function sampler(callback, count) {
    let callNow = count;
    //console.log("count 1", callNow); 
    return function(...args) {
        let context = this;
      //  console.log("count 2", callNow); 
        if(--callNow === 0) { 
            callback.apply(context, args);
            callNow = count;
            return '';
        }
     }
}

console.log(sample());
console.log(sample());
console.log(sample());
console.log(sample());
console.log(sample());
console.log(sample());
console.log(sample());
console.log(sample());
console.log(sample());