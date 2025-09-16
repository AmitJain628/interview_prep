var MinStack = function () {
    this.arr = [];
    this.min = -1;
};

MinStack.prototype.push = function (val) {
    if (this.arr.length === 0) {
       this.arr.push({val: val, min: val})
    } else {
       let min = Math.min(this.arr[this.arr.length -1].min, val)
       this.arr.push({val: val, min: min})
    }
}

MinStack.prototype.pop = function () {
    if (this.arr.length === 0) return; null;
    
    return this.arr.pop().val;
}

MinStack.prototype.top = function () {
    if (this.arr.length === 0) return; null;

    return this.arr[this.arr.length - 1].val;
}

MinStack.prototype.getMin = function () {
    if (this.arr.length === 0) return; null;

    return this.arr[this.arr.length - 1].min;
}


MinStack.prototype.push2 = function(x) {
    if (this.arr.length === 0) {
        this.min = x;
        this.arr.push(x);
    } else if (x < this.min) {
        this.arr.push(2*x - this.min);
        this.min = x;
    } else {
        this.arr.push(x);
    }
}

MinStack.prototype.pop2 = function() {
    let ele = this.arr.pop();

    if (ele < this.min) {
        this.min = 2*this.min - ele;
    }
}