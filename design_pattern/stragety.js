/*

The provided text explains the Strategy design pattern, a behavioral design pattern that allows dynamic selection of algorithms at runtime. Here's a breakdown of the key concepts and components:

*/

// straegy interface
class DiscountStrategy {
    calculate(price) {
        throw new Error("Subclasses must implement this method");
    }
}

// concrete strategy
class NoDiscountStrategy extends DiscountStrategy {
    calculate(price) {
            return price;
    }
}

class FlatDiscountStrategy extends DiscountStrategy {
    constructor(discount) {
      super();
      this.discount = discount;
    }

    calculate(price) {
      return price - this.discount;
    }
}


class PercentsStrategy extends DiscountStrategy {
    constructor(percentage) {
      super();
      this.percentage = percentage;
    }

    calculate(price) { 
        return price * (price - this.percentage / 100);
    }
}

// context

class ShoppingCart {
    constructor() {
        this.items = [];
        this.discountStrategy = new NoDiscountStrategy();
    }

    setDiscountStrategy(discountStrategy) { this.discountStrategy = discountStrategy; }

    addItem(item) { this.items.push(item); }

    calculateTotalPrice() {
        return this.items.reduce((total, item) => total + this.discountStrategy.calculate(item));
    }
}

// usage
const shoppingCart = new ShoppingCart();
shoppingCart.addItem(100);
shoppingCart.addItem(200);
shoppingCart.addItem(300);
shoppingCart.setDiscountStrategy(new FlatDiscountStrategy(20))

shoppingCart.calculateTotalPrice(); //