// time complexity -> O(nlogn)
/*
sort a linked list

Input:
10 -> 5 -> 22 -> 3 -> 17 -> 10
5->10  3->22 10->17
3->5->10->22 10->17
3->5->10->10->17->22
Output:
3 -> 5 -> 10 -> 10 -> 17 -> 22

*/

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
var sortList = function(head) {
   
    if(!head || !head.next) {
     return head
    }
 
    let mid = getMid(head);
    let left = sortList(head);
    let right = sortList(mid);
 
    return merge(left, right)
 };
 
 function getMid(head) {
     let slowPtr = head;
     let fastPtr = head;
     let prev = null;
 
     while(fastPtr && fastPtr.next) {
         prev = slowPtr;
         slowPtr = slowPtr.next;
         fastPtr = fastPtr.next.next
     }
     
     prev.next = null;
     return slowPtr;
 }
 
 function merge(left, right) {
     const dummy = new ListNode(0);
     let tail = dummy;
 
     while(left && right) {
         if (left.val < right.val) {
             tail.next = left;
             left = left.next
         } else {
             tail.next = right;
             right = right.next
         }
         tail = tail.next;
     }
 
     tail.next = left || right;
     return dummy.next
 }