/*
Stack 1 will grow from the left side (index 0) towards the right.
Stack 2 will grow from the right side (last index) towards the left.
Both stacks should not overlap. If the two stacks try to use the same space, it means the array is full.
*/

function twoStacks(size) {
    this.arr = new Array(size);
    this.capacity = 10;
    this.top1 = -1;
    this.top2 = this.arr.length -1;

    this.push1 = function(item) {
        if (this.top1 < this.top2 - 1) {
             this.top1++;
             this.arr[this.top1] = item;
        } else {
            return;
        }
    }

    this.push2 = function(item) {
        if (this.top1 < this.top2 - 1) {
             this.top2--;
             this.arr[this.top2] = item;
        } else {
            return;
        }
    }

    this.pop1 = function() {
        if (this.top1 > -1) {
            return this.arr[this.top1--];
        }
    }

    this.pop2 = function() {
        if (this.top2 <= this.arr.length - 1) {
            return this.arr[this.top2++];
        }
    }
}