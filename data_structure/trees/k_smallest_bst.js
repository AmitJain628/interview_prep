function kthSmallest(root, k) {
    let smallestNode = null;
    const smallest = (node) => {
         if(!node || smallestNode !== null) return;

         smallest(node.left);

         if(k-- === 1) {
            smallestNode = node;
            return;
         }

         smallest(node.right);
    }

    smallest(root);

    return smallestNode?.val;
}


function kSmallest(root, k) {
   if (root === null) return null;

   kSmallest(root.left, k);

   k++;
   if (k === 1) return root.val;

   kSmallest(root.right, k);

}

bst -> inoer

function smallest(root, k) {
   if (root == null) return null;

   smallest(root.left);
   if (--k === 0) return root.val;
   smallest(root.right);
}