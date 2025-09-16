function getMiddle(node) {
    let slow = node;
    let fast = node;

    while(fast && fast.next) {
            slow = slow.next;
            fast = fast.next.next;
        }
    
    return slow;
}

function reverseLinkedList(node) {
    let prev = null;
    let current = node;

    while(current) {
        let temp = current.next;
        current.next = prev;
        prev = current;
        current = temp;
    }

    return prev;
}

var isPalindrome = function(head) {
    let node = head;
    let middle = getMiddle(node);
    let reverse = reverseLinkedList(middle);

    while(reverse != null) {
        if (node.val!= reverse.val) return false;
        node = node.next;
        reverse = reverse.next;
    }

    return true;
}