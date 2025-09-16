function test(str, callback) {
    try {
         callback()
    } catch(err) {
        console.log(`Fail ${str}`);
    }
}

class Expectation {
    constructor(actual, isNot = false) {
        this.actual = actual;
        this.isNot = isNot
    }

    get not() {
        return new Expectation(this.actual, !this.isNot)
    }

    assert(condition, message) {
       const shouldPass =  this.isNot ? !condition : condition;
       if (!shouldPass) {
        throw new Error("");
       }
    }

    toBeNUll() {
        const condition = this.value === null;
        const message = this.isNot 
        ? `Expected ${formatValue(this.actual)} not to be ${formatValue(expected)}`
        : `Expected ${formatValue(this.actual)} to be ${formatValue(expected)}`;
        this.assert(condition, message);
        return this;   
    }

    toBe(expected) {
        const condition = this.actual === expected;
        const message = this.isNot 
        ? `Expected ${formatValue(this.actual)} not to be ${formatValue(expected)}`
        : `Expected ${formatValue(this.actual)} to be ${formatValue(expected)}`;
        this.assert(condition, message);
        return this;  
    }
}

function expect(expectedValue) {
  return new Expectation(expectedValue)
}

expect(2 + 2).toBe(4);
