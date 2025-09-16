function Events() {
    this.subscriptionList = new Map()
    this.subscriptionOnceList = new Map();
    this.subscriptionAsyncList = new Map();


    const subscribe = (name, callback) => {
        if (!this.subscriptionList.has(name)) {
            this.subscriptionList.set(name, [callback]);
        } else {
           const existingCallbacks = this.subscriptionList.get(name);
           this.subscriptionList.set(name, [...existingCallbacks, callback]);
        }

        return {
            remove: () => {
                const existingCallbacks = this.subscriptionList.get(name);
                const callbacks = existingCallbacks.filter(func => func != callback);
                this.subscriptionList.set(name, callbacks);
            }
        }
    }

    const subscribeOnce = (name, callback) => {
        if (!this.subscriptionOnceList.has(name)) {
            this.subscriptionOnceList.set(name, [callback]);
        } else {
           const existingCallbacks = this.subscriptionOnceList.get(name);
           this.subscriptionOnceList.set(name, [...existingCallbacks, callback]);
        }
    }

    const subscriptionAsyncList = (name) => {
        return new Promise((resolve, reject) => {
            if (!this.subscriptionAsyncList.has(name)) {
                this.subscriptionAsyncList.set(name, [resolve]);
            } else {
            const existingCallbacks = this.subscriptionAsyncList.get(name);
            this.subscriptionAsyncList.set(name, [...existingCallbacks, resolve]);
            }
        });
    }''

    const publish = (name, data) => {
       const subList = this.subscriptionList.get(name);
       subList.forEach(callback => {
          callback(data);
       });


       const subOnceList = this.subscriptionOnceList.get(name);
       subOnceList.forEach(callback => {
          callback(data);
       });
       this.subscriptionOnceList.set(name, []);

       const subAsyncList = this.subscriptionAsyncList.get(name);
       subOnceList.forEach(resolve => {
          resolve(data);
       });
       this.subscriptionOnceList.set(name, []);
    }

    publishAll = (data) => {
        this.subscriptionList.forEach(sub => {
            sub.forEach(callback => {
                callback(data);
            });
        })
    }
}