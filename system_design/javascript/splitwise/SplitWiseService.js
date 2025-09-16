const { EqualSplit, ExactSplit, PercentSplit } = require('./Split');

class SplitWiseService {
    instance;

    constructor() {
        if (SplitWiseService.instance) {
            return SplitWiseService.instance;
        }
        SplitWiseService.instance = this;
        this.users = new Map();
        this.groups = new Map();
        this.expenses = new Map();
        this.trasncations = new Map();
    }

    addUser(user) {
        this.users.set(user.id, user);
    }

    addGroup(group) {
        this.groups.set(group.id, group);
    }

    addExpenses(groupId, expense) {
        let group = this.groups.get(groupId);
        if (!group) {
            throw new Error('Group not found');
        }
        console.log("group: " + groupId, expense);
        group.addExpenses(expense);
        this.expenses.set(expense.id, expense);
        this.updateBalance(expense);
    }

    updateBalance(expense) {
       let paidBy = expense.paidBy;
       expense.splits.forEach(split => {
          let splitAmount = 0;
          if(split instanceof EqualSplit) {
            splitAmount = expense.amount / expense.splits.length;
          } else if(split instanceof PercentSplit) {
            splitAmount = expense.amount * (split.percent / 100);
          } else if (split instanceof ExactSplit) {
            splitAmount = split.amount;
          }

          console.log("splitAmount: " + splitAmount, split.user.id, paidBy);
          if (split.user.id != paidBy.id) {
            paidBy.updateBalance(split.user.id, splitAmount);
            split.user.updateBalance(paidBy.id, -splitAmount);
          }
       }); 
    }
}

module.exports = SplitWiseService; 