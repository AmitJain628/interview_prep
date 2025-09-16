function reverseKGroup(node, k) {
    let count = 0;
    let head = node
    let tmp = node;
    while(tmp && count < k) {
        count++;
        tmp = tmp.next;
    }

    if (count === k) {
       const reverseHead = reverse(head, tmp);
       head.next = reverseKGroup(tmp, k);
       return reverseHead;
    }
    
    return head;
}

function reverse(start, end) {
    let head = start;
    let prev = null;

    while(head != end) {
        let tmp = head.next;
        head.next = prev;
        prev = head;
        head = tmp;
    }

    return prev;  // return the new head of the reversed linked list

}