function goodNodes(root) {
    if(root === null) return 0;
    return calculateNodes(root, root.val)
}

function calculateNodes(root, maxVal) {
    if(root === null) return 0;
   
    let count = 0;
    if (root.val >= maxVal) {
       count  = 1;
       maxVal = root.val;
    }

    return count + calculateNodes(root.left, maxVal) + calculateNodes(root.right, maxVal);
}