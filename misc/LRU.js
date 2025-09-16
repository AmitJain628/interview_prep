 class Node {
    constructor(key, value, next = null, prev = null) {
            this.value = value;
            this.key = key
            this.prev = prev;
            this.next = next;
        }
}

const LRUCache = function(limit) {
    this.limit = limit;
    this.size = 0;
    this.head = null;
    this.tail = null;
    this.cache = new Map();

    this.put = function(key, value) {
      const existingNode = this.cache.get(key);

      if (existingNode) { // detach node from cache if it exists
        this.detach(existingNode);
        this.size--;
      } else if(this.size === this.limit) { // remove last node or tail from cache
        delete this.cache[this.tail.key];
        this.size--;
        this.detach(this.tail);
      }

      // insert node into cache at the start of the double linked list
      if (!this.head) {
        const node = new Node(key, value);
        this.head = node;
        this.tail = node;
      } else {
        const node = new Node(key, value, this.head);
        this.head.prev = node;
        this.head = node;
      }

      this.cache[key] = this.head;
      this.size++;
    }

    this.get = function(key) {
        const node = this.cache[key];

        if (node) {
            if (this.head !== node) {
                this.put(key, node.value);
            }

            return node.value;
        }
    
    return null;
    }

    this.detach = function(node) {
      if (node.prev !== null) {
         node.prev.next = node.next;
      } else {
        this.head = node.next;
      }

      if (node.next !== null) {
         node.next.prev = node.prev;
      } else {
        this.tail = node.prev;
      }
    }

    this.clear = function () {
        this.head = null;
        this.tail = null;
        this.size = 0;
        this.cache = {}
    }
}


const lrucache = new LRUCache(2);

lrucache.put('A', 1);
lrucache.put('B', 2);
console.log(lrucache.get('A'));
lrucache.put('C', 3);
console.log(lrucache.get('B'));
console.log(lrucache.get('C'));
console.log(lrucache.get('A'));
