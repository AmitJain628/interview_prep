

const Calculator = function(){
    this.total= 0,
    this.add= function(num) {
        this.total += num;
        return this;
    }
    this.subtract= function(num) {
        this.total -= num;
        return this;
    },
    this.multiply= function(num) {
        this.total *= num;
        return this;
    },
    this.divide= function(num) {
        this.total *= num;
        return this;
    }
}

const calculator = new Calculator()
calculator.add(10).subtract(20).multiply(30);
console.log(calculator.total);