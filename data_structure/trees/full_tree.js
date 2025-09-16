// full binary tree -> all nodes have both the children or none

const checkFullBinaryTree = (root) => {
    if (root === null) return true;

    if (root.left === null && root.right === null) return true;

    if ((root.right !== null && root.left === null) || (root.right === null && root.left !== null)) return false


    return checkFullBinaryTree(root.left) && checkFullBinaryTree(root.right);
}

function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val);
    this.left = (left === undefined ? null : left);
    this.right = (right === undefined ? null : right);
}

// Test Case 1: Full Binary Tree
let tree1 = new TreeNode(1);
tree1.left = new TreeNode(2);
tree1.right = new TreeNode(3);
tree1.left.left = new TreeNode(4);
tree1.left.right = new TreeNode(5);
tree1.right.left = new TreeNode(6);
tree1.right.right = new TreeNode(7);

console.log(checkFullBinaryTree(tree1)); // Output: true

// Test Case 2: Not a Full Binary Tree
let tree2 = new TreeNode(1);
tree2.left = new TreeNode(2);
tree2.right = new TreeNode(3);
tree2.left.left = new TreeNode(4);

console.log(checkFullBinaryTree(tree2)); // Output: false

// Test Case 3: Empty Tree
console.log(checkFullBinaryTree(null)); // Output: true
