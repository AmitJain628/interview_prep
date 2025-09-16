class Node {
    constructor(key, value, next = null, prev = null) {
        this.key = key;
        this.value = value;
        this.next = next;
        this.prev = prev;
    }
}
class LRUCache {
       constructor(limit) {
        this.limit = limit;
        this.cache = new Map();
        this.head = null;
        this.tail = null;
        this.size = 0;
       }

       put(key, value) {
        let existingNode = this.cache.get(key);
        if(existingNode) {
            this.detach(existingNode);
            this.cache.delete(key);
            this.size--;
        } else if (this.size === this.limit) {
             delete this.cache[this.tail.key];
             this.size--;
             this.detach(this.tail);
        }

        if(!this.head) {
            const newNode = new Node(key, value);
                        this.head = newNode;
                        this.tail = newNode;
        } else {
            const newNode = new Node(key, value, this.head);
            this.head.prev = newNode;
            this.head = newNode;
        }
       }

       detach(node) {
            if(node.next === null) {
               this.tail = node.prev;
            }  else {
                node.next.prev = node.prev;
            }

            if(node.prev === null) {
                this.head = node.next;
            } else {
                node.prev.next = node.next;
            }

       }


       get(key) {
        const node = this.cache.get(key);
        if (node) {
           if (this.head != node) {
            this.put(key, node.value);
           }

           return node.value;
        }

        return -1
       }
}