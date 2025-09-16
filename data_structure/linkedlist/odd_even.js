/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var oddEvenList = function(head) {
    if (head == null || head.next == null) return head;

    let odd = new ListNode(0);
    let oddNode = odd;
    let even = new ListNode(0);
    let evenNode = even;
    let node = head;
    let index = 1; 
    while(node != null) {
       if (index % 2 === 1) {
         oddNode.next = node;
         oddNode = oddNode.next;
       } else {
         evenNode.next = node;
         evenNode = evenNode.next;
       }
       node = node.next;
       index++;
    }

    evenNode.next = null;
    oddNode.next = even.next;

    return odd.next;

};