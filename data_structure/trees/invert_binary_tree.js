// time complexity - O(n) space complexity O(h)
function invert(root) {
    if (root === null){
        return null;
    }

   let left =  invert(root.left);
   let right = invert(root.right);

   root.left = right;
   root.right = left;

   return root;
}

function swap(node1, node2) {
    let tmp = node1;
    node1 = node2;;
    node2 = tmp;
}