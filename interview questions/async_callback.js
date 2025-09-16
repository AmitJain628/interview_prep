class QueueCallbacks {
    constructor(order = 'FIFO') {
        this.order = order;
        this.queue = [];
        this.current = 0;
    }

    process(fn) {
        if (this.current < 2) {
            this.current++;
            Promise.resolve(fn()).then((i) => {
                console.log(i);
            }).finally(() => {
                this.current--;
                this.executeNext();
            });;
        } else {
           if (this.queue.length < 6) this.queue.push(fn)
        }
    }

    executeNext() {
        if(this.queue.length > 0 && this.current < 2){
            let fn =  this.order == "FIFO" ? this.queue.shift() : this.queue.pop();
            this.process(fn);
        }
    }
}