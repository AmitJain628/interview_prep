function sameTree(root1, root2) {
    if (root1 === null && root2 === null) return true;

    if (root1 !== null && root2 === null) return false;

    if (root1 === null && root2 !== null) return false;

    return root1.val === root2.val && sameTree(root1.left, root2.left) && sameTree(root1.right, root2.right); 

}