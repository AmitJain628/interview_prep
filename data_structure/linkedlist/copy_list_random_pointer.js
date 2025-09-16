/**
 * // Definition for a Node.
 * function Node(val, next, random) {
 *    this.val = val;
 *    this.next = next;
 *    this.random = random;
 * };
 */

/**
 * @param {Node} head
 * @return {Node}
 */
var copyRandomList = function(head) {
    
    let headwithkey = head;
    const map = new Map();
    let i = 0;
    while(headwithkey) {
        map.set(headwithkey, new Node(headwithkey.val, null, null));
        headwithkey = headwithkey.next;
    }
    
    headwithkey = head;
    while(headwithkey) {
        let temp = map.get(headwithkey);
        temp.next = map.get(headwithkey.next) || null;
        temp.random = map.get(headwithkey.random) || null;
        headwithkey = headwithkey.next;
    }
    
    return map.get(head);
};