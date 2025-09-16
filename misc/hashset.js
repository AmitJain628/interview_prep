class Store {
     hash = {}

     get(key) {
         return this.hash[key]
     }

     set(key, value) {
              this.hash[key] = value
     }

     has(key) {
        if(this.hash.hasOwnProperty(key)) {
            return true
        };

        return false;
     }
}

const store = new Store();
store.set('a', 10);
store.set('b', 20);
store.set('c', 30);

console.log(store.get('b')); // 10
console.log(store.has('c')); // 10
console.log(store.get('d')); // 10
console.log(store.has('e')); // 10