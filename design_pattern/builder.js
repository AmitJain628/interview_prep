class Payment {
    constructor(amount, currency) {
            this.amount = amount;
            this.currency = currency;
    }

    addAmount = function(amount) {
        this.amount += amount;

        return this;
    }

    pay() {
        console.log(`Paying ${this.amount} ${this.currency}`);
    }
}

const p1 = new Payment(10, 'USD');
const p2 = new Payment(20, 'USD');