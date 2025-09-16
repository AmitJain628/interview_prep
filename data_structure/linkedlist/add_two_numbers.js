/*
Input: l1 = [2,4,3], l2 = [5,6,4]
Output: [7,0,8]
Explanation: 342 + 465 = 807.
*/
function addTwoNumbers(l1, l2) {
    let carry = 0;
    let dummy = new ListNode(null);
    let head = dummy;
 
     while(l1 || l2 || carry !== 0) {
        let sum = carry + (l1 ? l1.val : 0) + (l2 ? l2.val : 0);
        if (sum > 9) {
           carry = Math.floor(sum / 10);
           sum = sum % 10;
        } else {
         carry =0;
        }
        head.next = new ListNode(sum);
        head = head.next;
        l1 = l1  ? l1.next : null;
        l2 = l2 ? l2.next : null;
     }
 
     return dummy.next;
   

}