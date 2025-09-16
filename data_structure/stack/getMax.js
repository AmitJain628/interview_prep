10 8  12

   2*
14 max = 12 
8 max = 10
10 max = 10 
class Stack {
    stack = [];
    max = -Infinity

    push(ele) {
        if (this.isEmpty()) {
            this.stack.push(ele);
            this.max = ele;
        } else if (ele < this.max) {
            this.stack.push(ele);
        } else {
            this.stack.push(2*ele - this.max);
            this.max = ele;
        }

    }

    pop () {
        let ele = this.stack.pop();
        if (ele > this.max) {
              this.max = 2*this.max - ele
        }
    }

    top() {
        let el = stack.peek();
        if (ele > this.max) {
            return this.max;
        }
         
        return ele;
    }

    getMax(ele) {
        return this.max;
    }

    isEmpty(){
        return this.stack.length === 0
    }
}