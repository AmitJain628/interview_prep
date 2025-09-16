function remove(head, n) {
   if (head === null || head.next === null) return;
   let dummy = new ListNode(0, head);
  let slowPtr = dummy;
  let fastPtr = head;

  while(n>0) {
    fastPtr = fastPtr.next;
    n--;
  }

  while(fastPt.nextr !== null) {
    fastPtr = fastPtr.next;
    slowPtr = slowPtr.next;
  }

  slowPtr.next = slowPtr.next.next;

  return dummy.next;

}