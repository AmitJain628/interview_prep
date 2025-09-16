/*
 the Factory Design Pattern in JavaScript is a creational pattern that provides a way to create objects without specifying the exact class of object that will be created. 
 Instead, it defines a method for creating the objects, which allows for flexibility and scalability.
  The pattern promotes loose coupling by reducing the dependency between the client code and the specific classes it needs to instantiate.
 This is particularly useful when dealing with complex object creation logic or when you want to ensure that certain invariants are maintained during object creation.
 Type: Creational design pattern.

  Purpose: Delegates object creation to a factory method instead of directly instantiating classes.
*/

class Circle {
    constructor(radius) {
        this.radius = radius;
    }

    calculateArea() {
        return Math.PI * Math.pow(this.radius, 2);
    }
}

class Rectangle {
    constructor(width, height) {
            this.width = width;
            this.height = height;
    }

    calculateArea() {
            return this.width * this.height;
    }
}

class ShapeFactory {
    createShape(type, dimensions) {
        switch(type) {
            case 'circle':
                return new Circle(dimensions[0]);
            case'rectangle':
                return new Rectangle(dimensions[0], dimensions[1]);
            default:
                throw new Error('Invalid shape type');
        }
    }
}

const factory = new ShapeFactory();
const circle = factory.createShape('circle', 10);
circle.calculateArea()