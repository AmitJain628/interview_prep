const User = require('./User');
const Group = require('./Group');
const Expenses = require('./Expenses');
const { EqualSplit } = require('./Split');
const SplitWiseService = require('./SplitWiseService');

function main() {

    let splitWiseService = new SplitWiseService()

    let user1 = new User(1, "John", "abc@gmail.com");
    let user2 = new User(2, "Bhawna", "bha@gmail.com");
    let user3 = new User(3, "Sarog", "sar@gmail.com");

    splitWiseService.addUser(user1);
    splitWiseService.addUser(user2);
    splitWiseService.addUser(user3);

    let group1 = new Group(1, "trip to manali");

    group1.addMember(user1);
    group1.addMember(user2);
    group1.addMember(user3);

    splitWiseService.addGroup(group1);

    let expense = new Expenses("1",  "ticket booking", 4000, user1, [new EqualSplit(user1), new EqualSplit(user2), new EqualSplit(user3)]);

    splitWiseService.addExpenses(group1.id, expense);

    splitWiseService.users.forEach(user => {
        console.log(`${user.name}'s balances:`);
        for (let [userId, amount] of user.balances) {
            const otherUser = splitWiseService.users.get(userId);
            console.log(`  ${otherUser.id}: ${amount}`);
        }
    });

}

main();