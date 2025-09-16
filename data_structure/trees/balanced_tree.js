function getheight(root) {
    if (root == null) return 0;

    let left = getheight(root.left);
    let right = getheight(root.right);

    return Math.max(left, right) + 1;
}

function isBalanced(root) {
    if (root == null) return false;

    let leftHeight = getheight(root.left);
    let rightHeight = getheight(root.right);

    return Math.abs(leftHeight - rightHeight) <= 1 && isBalanced(root.left) && isBalanced(root.right);
}