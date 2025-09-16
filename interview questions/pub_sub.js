function pubsub() {
    let observer = [];

    return {
        subscriber(name, callback) {
            this.observer.push({
                name, callback, always: true, invoked: 0
            });
        },
        subscriberOne(name, callback) {
            this.observer.push({
                name, callback, always: false, invoked: 0
            });
        },
        subscribeOnceAsync(name) {
            const promise = new Promise((resolve, reject) => {
                resolve(name);
            });
            this.observer.push({
                name, callback: promise, always: false, invoked: 0
            });

        },
        publisher(name, data) {
           for (let observe of this.observer) {
              if (observe.name === name) {
                if (observe.always && observe.invoked > 1) {
                    return;
                }
                observe.invoked++;
                observe.callback(data);
              }
           }
        },
        publisherAll(name) {
            for (let observe of this.observer) {
                  if (observe.always && observe.invoked > 1) {
                      continue;
                  }
                  observe.invoked++;
                  observe.callback(data);
             }
        },
        remove(name) {
            this.observe = [...this.observe.filter(el => el.name == name)];

        }
    }
}

class PubSub {
    constructor() {
      this.subscribers = new Map();
      this.onceSubscribers = new Map();
      this.onceAsyncResolvers = new Map();
    }
  
    subscribe(name, callback) {
      if (!this.subscribers.has(name)) {
        this.subscribers.set(name, []);
      }
      const callbacks = this.subscribers.get(name);
      callbacks.push(callback);
  
      // Return an unsubscribe function
      return {
        remove: () => {
          const index = callbacks.indexOf(callback);
          if (index !== -1) callbacks.splice(index, 1);
        }
      };
    }
  
    subscribeOnce(name, callback) {
      if (!this.onceSubscribers.has(name)) {
        this.onceSubscribers.set(name, []);
      }
      const callbacks = this.onceSubscribers.get(name);
      callbacks.push(callback);
    }
  
    subscribeOnceAsync(name) {
      return new Promise((resolve) => {
        if (!this.onceAsyncResolvers.has(name)) {
          this.onceAsyncResolvers.set(name, []);
        }
        this.onceAsyncResolvers.get(name).push(resolve);
      });
    }
  
    publish(name, data) {
      // Call all regular subscribers
      if (this.subscribers.has(name)) {
        for (const callback of this.subscribers.get(name)) {
          callback(data);
        }
      }
  
      // Call all once-subscribers
      if (this.onceSubscribers.has(name)) {
        for (const callback of this.onceSubscribers.get(name)) {
          callback(data);
        }
        this.onceSubscribers.delete(name);
      }
  
      // Resolve all onceAsync subscribers
      if (this.onceAsyncResolvers.has(name)) {
        for (const resolve of this.onceAsyncResolvers.get(name)) {
          resolve(data);
        }
        this.onceAsyncResolvers.delete(name);
      }
    }
  
    publishAll(name) {
      this.publish(name);
    }
  }
  