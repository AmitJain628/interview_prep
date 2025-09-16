function Animal(name) {
    this.name = name;
}

Animal.prototype.walk = function() {
    console.log("walk");
}


function Dog(name, breed) {
    Animal.call(this, name);
}

Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;