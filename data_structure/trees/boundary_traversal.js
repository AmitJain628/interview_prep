function boundaryTraversal(root) {
    let res = [];
    if (!root) return res;

    res.push(root.val);
    leftTraversal(root, res);
    leafTraversal(root, res);
    rightTraversal(root, res);
}

function isLeaf(node) {
    return node.left === null && node.right === null;
}

function leftTraversal(node, res) {
    let curr = node.left;
    while (curr) {
        if(isLeaf(curr)) res.push(curr.val);
        if (curr.left) curr = curr.left; else curr = curr.right;
    }
}

function rightTraversal(node, res) {
    let temp = []
    let curr = node.right;
    while (curr) {
        if(isLeaf(curr)) temp.push(curr.val);
        if (curr.right) curr = curr.right; else curr = curr.left;
    }

    res.push([...temp.reverse()])
}

function leafTraversal(node, res) {
    if(isLeaf(node)) {
        res.push(node.val);
                return;
    }

    leafTraversal(node.left);
    leafTraversal(node.right);
}