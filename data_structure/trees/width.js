/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 * Time Complexity: O(N), where N is the number of nodes in the tree, because each node is processed once.
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var widthOfBinaryTree = function(root) {
    let queue = [{node: root, idx: 0}];
    let maxWidth = 0

    while(queue.length) {
        let startIndex = queue[0].idx;
        let endIndex = queue[queue.length - 1].idx;
        let levelSize = queue.length;

        maxWidth = Math.max(maxWidth, endIndex - startIndex + 1);

        for (let i=0; i< levelSize; i++) {
            const {node, idx} = queue.shift();
            const nodeIndex = idx - startIndex;

            if (node.left) {
              queue.push({node: node.left, idx: 2 * nodeIndex + 1 })
            }
            if (node.right) {
              queue.push({node: node.right, idx: 2 * nodeIndex + 2 })
            }
        }
    }

    return maxWidth
};