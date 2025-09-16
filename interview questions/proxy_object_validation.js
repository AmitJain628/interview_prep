let schema = {
    'name': 'string',
    'age': 'number',
    'tags': 'array',
    'dob': Date
}

const person = createValidatedObject(schema);

function createValidatedObject(schema, inital = {}) {
    const matches = (value, expected) => {
       if (expected === 'array') return Array.isArray(value);
       if (expected == 'string') return typeof value == 'string';
       if (expected === 'function') return value instanceof expected
    }

    for(let [key, value] of Object.entries(inital)) {
        if (!schema[key]) {
            throw new TypeError(`Unknown property "${key}" in initial object`);
        }

        if (matches(value, schema[key])) {
            throw new TypeError(`Property "${key}" must be ${schema[key]}`);
        }
    }

    return new Proxy(inital, {
        get(target, prop, value){},
        set(target, prop, value) {
            if (!(prop in schema)) {
                throw new TypeError("key not presetn")
            }

            if (!matches(value, schema[prop])) {
                throw new TypeError("key not presetn")
            }

            target[prop] = value;
            return true;
        },
        defineProperty(target, prop, descriptor) {
            return Reflect.defineProperty(...arguments)
        }
    })
}