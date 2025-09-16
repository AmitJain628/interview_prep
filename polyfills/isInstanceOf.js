class A {

}

class B {
}

const obj1 = new A();
const obj2 =new B();
console.log(obj2 instanceof A);

function instanceOfPolyfill(object, constructor) {
    if (typeof constructor !== 'function') {
        return false
    }
    // Get the prototype of the constructor
    const parentPrototype = constructor.prototype;

    // Traverse the prototype chain of `object`
    let objectPrototype = Object.getPrototypeOf(object);

    while (objectPrototype) {
        // Check if the prototype matches
        if (objectPrototype === parentPrototype) {
            return true;
        }
        objectPrototype = Object.getPrototypeOf(objectPrototype);
    }

    return false;
  }

console.log(instanceOfPolyfill(obj2, A));
