let obj = {
    name: 'John',
    age: 30,
    hobbies: ['reading', 'painting'],
    address: {
        street: '123 Main St',
        city: 'New York'
    }
}

const proxyObject = new Proxy(obj, {
    get(target, prop) {

        if (prop === 'name') {
            console.log("you can't access this property");
            return undefined;
        }
     
        return target[prop];
    }, 
    set(target, prop, value) {
        if (prop === 'age') {
            if (value < 0 || value > 150) {
                console.log("Invalid age");
                return false;
            } 

            target[prop] = value;
            return true;
        }
    target[prop] = value;
    }
});