function onePlusLinkedList(head) {
    let carry =1;
    let temp = head;

    let node = reverse(temp);

    while(node != null || carry != 0) {
        let sum = carry + (node ? node.value : 0);
        if(sum > 9) {
            carry = Math.floor(sum / 10);
            node.value = sum % 10;
        } else {
            carry = 0;
        }
        if(node && node.next) {
            node = node.next;
        } else {
            break;
        }
        
    }

    if(carry) {
        let newNode = new ListNode(carry);
        node.next = newNode;
    }

    return reverse(node);

}

function reverse(head) {
    let prev = null;
    let current = head;

    while(current) {
        let temp = current.next;
        current.next = prev;
        prev = current;
        current = temp;
    }

    return prev;  // return the new head of the reversed linked list
}