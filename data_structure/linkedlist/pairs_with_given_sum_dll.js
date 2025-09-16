function givenSum(head, sum) {
    let left = head;
    let right = head;

    while(right.next != null) {
        right = right.next;
    }
    let result = [];

    while(left.val < right.val) {
        let total = left.val + right.val;
        if (total == sum) {
            result.push([left.val, right.val]);
            left = left.next;
            right = right.prev;
        } else if (total > sum) {
            right = right.prev;
        } else {
            left = left.next;
        }
    }
    return result;
}