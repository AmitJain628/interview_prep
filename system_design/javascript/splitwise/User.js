class User {
    constructor(id, name, email) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.balances = new Map(); // <<userId, balance>>
    }

    updateBalance(userId, balance) {      
        this.balances.set(userId, this.balances.get(userId) || 0 + balance);
    }
}

module.exports = User; 