function diameter(root) {
    let max = 0;
    const getRoot = (root) => {
        if (root == null) return 0;
        let left = getRoot(root.left);
        let right = getRoot(root.right);

        max = Math.max(max, left + right);

        return 1 + Math.max(left, right);
    }
}