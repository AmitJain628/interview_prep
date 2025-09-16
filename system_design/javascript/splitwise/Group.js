class Group {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.members = [];
        this.expenses = [];
    }

    addMember(user) {
        this.members.push(user);
    }

    addExpenses(expenses) {
        this.expenses.push(expenses);
    }
}

module.exports = Group; 