/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} subRoot
 * @return {boolean}
 */

const isCompare = (root1, root2) => {
    if (root1 === null && root2 === null) return true;

    if (root1 === null || root2 === null) return false;
    
    if (root1.val !== root2.val) return false;

   // console.log("compare", root1, root2)

    return isCompare(root1.left, root2.left) && isCompare(root1.right, root2.right)
   }

var isSubtree = function(root, subRoot) {
 
   if (root == null) return false;

   if (isCompare(root, subRoot)) return true

   return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot)
};