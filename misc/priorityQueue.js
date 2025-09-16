class MaxPriorityQueue {
    constructor() {
            this.heap = [];
    }

    enqueue(element, priority) {
       const node = {element, priority};
       this.heap.push(node);
       this._bubbleUp(); // heapify the array
    }

    dequeue() {
        if (this.heap.length === 0) { return null; }
        this._swap(0, this.heap.length-1);  // swap the top priority element with the last element
        const ele =  this.heap.pop(); // remove the last element
        this._bubbleDown();
        return ele.element;
    }

    _swap( i, j ) {
        const temp = this.heap[i];
        this.heap[i] = this.heap[j];
        this.heap[j] = temp;   
    }

    size() {
        return this.heap.length;
    }

    _bubbleUp(){
        let index = this.heap.length - 1;
        const element = this.heap[index];

        while(index>0) {
            const parentIndex = Math.floor((index-1)/2);
            const parentElement = this.heap[parentIndex];

            if (element.priority > parentElement.priority) { // check element priority is greater than parent element
                this._swap(index, parentIndex);
                index = parentIndex;
            } else {
                break;
            }
        }
    }


    _bubbleDown(){
        let index = 0;
        const element = this.heap[index];
        const length = this.heap.length;
        while(true) {
            const left = 2 * index + 1;
            const right = 2 * index + 2;
            let swapIndex = null;
            
            if (left < length) {
                if (this.heap[left].priority > element.priority) { // check left element priority with root element
                    swapIndex = left;
                }
            }

            if (right < length) {
                if (
                    (swapIndex === null && this.heap[right].priority > element.priority) ||  // check right element priority with root element
                    (swapIndex !== null && this.heap[right].priority  > this.heap[swapIndex].priority)  // check swap index element priority with right element
                ) {
                    swapIndex = right;
                }
            }
            if (swapIndex === null) { break;}

            this._swap(swapIndex, index);
            index = swapIndex;
        }
    }

    peek() {
        return this.heap[0] ? this.heap[0].element : null;
    }
}


const maxHeap = new MaxPriorityQueue();

// Enqueue elements with priority
maxHeap.enqueue("task1", 3);
maxHeap.enqueue("task2", 5);
maxHeap.enqueue("task3", 1);
maxHeap.enqueue("task4", 4);

console.log(maxHeap.peek());  // task2 (priority 5)

// Dequeue elements (removes and returns the element with the highest priority)
console.log(maxHeap.dequeue());  // task2 (priority 5)
console.log(maxHeap.peek());  // task4 (priority 5)
console.log(maxHeap.dequeue());  // task4 (priority 4)
console.log(maxHeap.dequeue());  // task1 (priority 3)
console.log(maxHeap.dequeue());  // task3 (priority 1)
