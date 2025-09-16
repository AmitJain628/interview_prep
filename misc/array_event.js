
Array.prototype.listeners = {};

Array.prototype.addListener = function(eventName, callback) {
  if (!this.listeners[eventName]) {
    this.listeners[eventName] = [];  
   }
   this.listeners[eventName].push(callback);  
}

Array.prototype.removeListerner = function(eventName, callback) {
    if (this.listeners[eventName]) {
    this.listeners[eventName] = this.listeners[eventName].filter(e => e.name === callback);
    }   
}

Array.prototype.pushWithEvent = function(eventName, arr) {
   this.push(...arr);

   this.triggerEvent(eventName, arr)
}

Array.prototype.popWithEvent = function(eventName) {
    const element =  this.pop()
    this.triggerEvent(eventName, element)
 }

Array.prototype.triggerEvent = function(eventName, arr) { 
    if (this.listeners[eventName]) {
     this.listeners[eventName].forEach(callback => {
        callback(eventName, arr, this)
     });
    }
 }
 
 
 const arr = [];

arr.addListener('add', (eventName, items, array) => {
    console.log('items were added', items);
});

arr.addListener('remove', (eventName, item, array) => {
    console.log(item, 'was removed');
});

arr.pushWithEvent('add', [4, 5]);
arr.popWithEvent('remove');