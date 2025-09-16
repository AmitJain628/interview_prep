let handler = {
    get: (target, prop) => {
        console.log(`trying to access ${target[prop]}`);
        return target[prop]; // OR Reflect.get(...arguments)
    },
    set: (target, prop, value) => {
        if (prop === "age" && (typeof value !== 'number' && value < 0)) {
            throw new Error("invalid properties")
        }

        if (value === "name") {
            return false
        }
        target[prop] = value; // OR Reflect.set(...arguments)
    }
}

let user = {
    name: "john",
    age: 25
}
let obj = new Proxy(user, handler)


Object.defineProperties(obj, "userId", {
    writable: false
});

const obj = {
  id: 1,
  username: "John",
  password: "secret",
  email: "john@email.com",
};


function removeCycle() {
    let seen = new WeakMap();

    return function(key, value) {
         if (seen.has(key)) return;

         seen[key] = value;
         return value;
    }
}

JSON.stringify(obj, removeCycle())