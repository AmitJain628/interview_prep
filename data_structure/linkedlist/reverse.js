function reverse(node) {
    let prev = null;
    let head = node;

    while(head != null) {
        let temp = head.next;
        head.next = prev;
        prev = head;
        head = temp;
    }

    return prev;  // return the new head of the reversed linked list
}

function reverseRecursive(node) {
    // Base case: if the list is empty or has only one node, return the node
    if (node == null || node.next === null) return node;

    // Recursively reverse the rest of the list
    let newHead = reverseRecursive(node.next);

    // Reverse the links
    node.next.next = node; // Point the next node's `next` to the current node
    node.next = null; // Break the original link of the current node

    // Return the new head of the reversed list
    return newHead;
}