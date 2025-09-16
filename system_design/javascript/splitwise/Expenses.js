class Expenses {
    constructor(id, name, amount, paidBy, splits) {
        this.id = id;
        this.name = name;
        this.amount = amount;
        this.paidBy = paidBy;
        this.splits = splits;
    }
}

module.exports = Expenses; 