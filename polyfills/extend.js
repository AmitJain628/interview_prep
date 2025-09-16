const extend = function(Parent, Child) {
    // set the prototype chain to inherit from parent
    Child.prototype = Object.create(Parent.prototype);

    // Point the constructor to child
    Child.prototype.constructor = Child;

    // Copy static method
    Object.setPrototypeOf(Child, Parent);
}

function Parent() {
    this.name = "parent"
}

Parent.prototype.sayHello = function() {
    console.log("Hello from parent");
}

function Child() {
    this.name = "child"
}

Parent.prototype.walk = function() {
   console.log("walk from child");
}

extend(Parent, Child);

const child = new Child();
child.sayHello(); // "Hello from parent"
child.walk(); // "walk from child"
console.log(child instanceof Child);
console.log(child instanceof Parent);
