/*
Input: preorder = [3,9,20,15,7], 
inorder = [9,3,15,20,7]
Output: [3,9,20,null,null,15,7]
*/
function createTree(root, inOrder, preOrder) {
    let map = new Map();

    inOrder.forEach((el, index) => {
       map.set(el, index);
    });

    const buildTree = (root, inOrderStart, inOrderEnd, preOrderStart, preOrderEnd) => {
        if (inOrderStart > inOrderEnd || preOrderStart > preOrderEnd) return null;

        let node = new TreeNode(preOrder[preOrderStart]);
        let rootIndex = map.get(node.val);
        let numsLeft = rootIndex - inOrderStart;


        node.left = buildTree(node, inOrderStart, rootIndex -1, preOrderStart+1, preOrderStart+numsLeft);
        node.right = buildTree(node, rootIndex+1,  inOrderEnd, preOrder+ numsLeft +1, preOrderEnd);

        return node;
    }

    let root = buildTree(root, 0 , inOrder.length-1, 0, preOrder.length -1);
 }