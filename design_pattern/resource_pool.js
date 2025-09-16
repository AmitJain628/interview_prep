/*
Use Cases
Database Connection Pooling: Reuse limited database connections efficiently.
Thread Pooling: Reuse threads in multi-threaded applications.
File I/O: Manage limited file handles for reading/writing files.
*/


class ResourcePool {
    constructor(createResource, maxResource = 10) {
        this.createResource = createResource;
        this.maxResource = maxResource;
        this.activeResources = new Set();
        this.pool = [];
        this.queue = [];
    }

    async acquire() {
        if (this.pool.length > 0) {
            const resource = this.pool.pop();
            this.activeResources.push(resource);
            return resource;
        }
        
        if (this.activeResources.length < this.maxResources) {
            const newResource = await this.createResource();
            this.activeResources.push(newResource);
            return newResource;
        }


        return new Promise((resolve) => {
            this.queue.push(resolve);
        });
    }

    release(resource) {
        if(this.activeResources.has(resource)) {
            this.activeResources.delete(resource);
            this.pool.push(resource);
            
            if(this.queue.length >0) {
                const nextPromise = this.queue.shift();
                const resource = this.pool.pop();
                this.activeResources.add(nextResource);
                nextPromise(resource);
            }
        }
    }
}


async function createResource(){
    return { id: Math.random().toString(36).substr(2, 5) }; // Simulate an object
}

const resourcePool = new ResourcePool(createResource, 10);


(async () => {
    // Acquire resources
    const resource1 = await pool.acquire();
    console.log("Acquired:", resource1);
  
    const resource2 = await pool.acquire();
    console.log("Acquired:", resource2);
  
    // Release a resource
    pool.release(resource1);
    console.log("Released:", resource1);
  
    // Acquire another resource
    const resource3 = await pool.acquire();
    console.log("Acquired:", resource3);
})();