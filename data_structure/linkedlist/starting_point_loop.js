function detectCycles(head){
    let slow = head;
    let fast = head;

    while(fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;

        if (slow === fast) {
            return slow;
        }
    }

    return null;
}
function startingPoint(head) {
  let meetingpoint = detectCycles(head);

  if (!isCycle) return null;

  let node = head;
  while(head !== meetingpoint) {
    head = head.next;
    meetingpoint = meetingpoint.next;
  }

  return head;
}