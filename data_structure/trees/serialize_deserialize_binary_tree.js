/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
var serialize = function(root) {
    const res = [];

    const preOrder = (root) => {
       if (root === null) {
           res.push('N');
           return;
       }

       res.push(root.val.toString());
       preOrder(root.left);
       preOrder(root.right);  
    }

    preOrder(root);
    return res.join(',');
};

/**
* Decodes your encoded data to tree.
*
* @param {string} data
* @return {TreeNode}
*/
var deserialize = function(data) {
   const nodeValues = data.split(',');
   let i=0;

   const buildTree = () => {
          if (nodeValues[i] === "N") {
               i++;
               return null;
          }

          const node = new TreeNode(parseInt(nodeValues[i]));
          i++;
          node.left = buildTree();
          node.right = buildTree();
          return node;
   }

   return buildTree();
};

/**
* Your functions will be called as such:
* deserialize(serialize(root));
*/