function reverse(head) {
    if (head == null || head.next == null || head.next.next == null) return;

    let slowPtr = head;
    let fastPtr = head;

    while(fastPtr && fastPtr.next) {
        slowPtr = slowPtr.next;
        fastPtr = fastPtr.next.next;
    }

    let mid = slowPtr;
    let prev = null;

    while(mid != null) {
        tmp = mid.next;
        mid.next = prev;
        prev = mid;
        mid = tmp;
    }

    let firstHalf = head;
    let secondHalf = prev;

    while(secondHalf.next != null) {
       let tmp = firstHalf.next;
       firstHalf.next = secondHalf;
       firstHalf = tmp;

       tmp = secondHalf.next;
       secondHalf.next = firstHalf;
       secondHalf = tmp;
    }

}
