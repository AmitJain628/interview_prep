class FirstUnique {
    constructor(nums) {
      this.queue = [];
      this.hashMap = new Map();
  
      for (let num of nums) {
        this.add(num); // reuse add logic
      }
    }
  
    #getUniqueIndex() {
      for (let i = 0; i < this.queue.length; i++) {
        if (this.hashMap.get(this.queue[i]) === 1) {
          return i;
        }
      }
      return -1; // no unique number
    }
  
    showFirstUnique() {
      const index = this.#getUniqueIndex();
      return index === -1 ? -1 : this.queue[index];
    }
  
    add(num) {
      this.queue.push(num);
      this.hashMap.set(num, (this.hashMap.get(num) || 0) + 1);
    }
  }
  