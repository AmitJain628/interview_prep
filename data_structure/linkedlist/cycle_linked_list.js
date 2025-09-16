function detectCycle(head) {
    let slowPtr = head;
    let fastPtr = head;

    while(slowPtr && fastPtr && fastPtr.next) {
        slowPtr =slowPtr.next;
        fastPtr = fastPtr.next;
        fastPtr = fastPtr.next;

        if (slowPtr === fastPtr) {
            return true
        }
    }

    return false
}