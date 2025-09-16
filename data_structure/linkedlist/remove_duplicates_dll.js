function removeDuplicates(head) {
    let node = head;
    while(node != null && node.next != null) {
        let nextNode = node.next;
        while(nextNode != null && node.val === nextNode.val) {
            nextNode = nextNode.next;
        }
        node.next = nextNode;
        if (nextNode) nextNode.prev = node;

        node = node.next;
    }

    return head;
}