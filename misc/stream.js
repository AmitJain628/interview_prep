function Stream() {
    this.subscribers = [];

    this.subscribe = function(fn) {
        if (typeof fn !== 'function') {
           throw new Error('Invalid subscribe function')
        }   
        this.subscribers.push(fn);
    };

    this.push = function(val) {
        this.subscribers.forEach(fn => fn.call(this, val));
    }
}

const z = new Stream();
z.subscribe(function(val) {console.log("val1", val)});

z.subscribe(function(val) {console.log("val2", val)});

z.subscribe(function(val) {console.log("val3", val)});

z.push(10);