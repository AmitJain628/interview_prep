/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function(root, p, q) {
    let parentVal = root.val;
    let node1Val = p.val;
    let node2Val = q.val;

    if (node1Val > parentVal && node2Val > parentVal) {
        return lowestCommonAncestor(root.right, p , q)
    }  else if (node1Val < parentVal && node2Val < parentVal) {
        return lowestCommonAncestor(root.left, p , q)
    } else {
        return root;
    }
};