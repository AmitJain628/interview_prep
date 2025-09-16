class ListNode {
    constructor(value = 0, next = null) {
      this.value = value;
      this.next = next;
    }
  }
  
  function sortLinkedList(head) {
    if (!head || !head.next) return head;
  
    let low = new ListNode(0); // Dummy node for 0's
    let mid = new ListNode(0); // Dummy node for 1's
    let high = new ListNode(0); // Dummy node for 2's
    
    let lowTail = low, midTail = mid, highTail = high;
    
    let current = head;
    
    // Traverse the original linked list and distribute nodes based on their value
    while (current) {
      if (current.value === 0) {
        lowTail.next = current;
        lowTail = lowTail.next;
      } else if (current.value === 1) {
        midTail.next = current;
        midTail = midTail.next;
      } else if (current.value === 2) {
        highTail.next = current;
        highTail = highTail.next;
      }
      current = current.next;
    }
    
    // Merge the three lists: 0's, 1's, and 2's
    lowTail.next = mid.next;
    midTail.next = high.next;
    highTail.next = null; // End the list
    
    return low.next; // Return the sorted list starting from the first 0 node
  }
  