function printTreeNode(root, val) {
    let path = [];
    const getPath = function(root, val) {
       if (root === null) return false;
       path.push(val);
       if (root.val === val) return true;

       if (getPath(root.left, val) || getPath(root.right, val)) {
        return true;
       }

       path.pop();
       return false;
    }

    getPath(root, val);
    return path;
}