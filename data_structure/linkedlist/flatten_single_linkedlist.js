/**
 * // Definition for a _Node.
 * function _Node(val,prev,next,child) {
 *    this.val = val;
 *    this.prev = prev;
 *    this.next = next;
 *    this.child = child;
 * };
 */

/**
 * @param {_Node} head
 * @return {_Node}
 */
var flatten = function(head) {
    if (head == null || head.next === null) return head;
    let mergeHead = flatten(head.next);
    return merge(head, mergeHead);
};

var merge = function(list1, list2) {
    let dummyNode = new _Node(0);
    let res = dummyNode;
    while(list1 != null && list2 != null) {
         if(list1.val < list2.val) {
            res.child = list1;
            res = res.child;
            list1 = list1.child;
         } else {
            res.child = list2;
            res = res.child;
            list2 = list2.child;
         }
    }

    if(list1 != null) {
        res.child = list1;
    } else if(list2 != null) {
        res.child = list2;
    }

    return dummyNode.child;
}