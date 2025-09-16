function MaxPathSum(root) {
    let maxSum = -Infinity;

    const getMaxSum = (root) =>{
       if (root == null) return 0;
       
       let leftSum = Math.max(getMaxSum(root.left), 0);
       let rightSum = Math.max(getMaxSum(root.right), 0);

       maxSum = Math.max(maxSum, leftSum + rightSum + root.val);

       return root.val + Math.max(leftSum, rightSum);
    }

    getMaxSum(root);
    return maxSum;
}