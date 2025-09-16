function detectCylce(head) {
    let slow = head;
    let fast = head;

    while(fast != null && fast.next != null) {
        slow = slow.next;
        fast = fast.next.next; // Move fast pointer two steps forward

        if (slow === fast) {
            return slow;
        }
    }

    return null;
}

function lengthOfLoop(head) {
    let node = detectCylce(head);

    if(node === null) {
        return 0;
    }

    let temp = node
    let count = 1;

    while(temp.next != node) {
        temp = temp.next;
        count++;
    }

    return count;
}