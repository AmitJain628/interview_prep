function isValidateBST(root) {

    const validate = (node, minValue, maxValue) => {
        if (root === null) return true;

        if (root.val <= minValue || root.val >= maxValue) return false

        return validate(root.left, minValue, root.val) && validate(root.right, root.val, maxValue);
    }

    return validate(root, Infinity, -Infinity)
}