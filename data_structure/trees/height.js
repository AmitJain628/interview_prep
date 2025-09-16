const height = (root) => {
    if (root === null) return null;
    
    const leftHeight = height(root.left);
    const rightHeight = height(root.right);

    return Math.max(leftHeight, rightHeight) + 1;
}

const width = (root) => {
    
}

function Node(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
  
  let tree = new Node(10);
  tree.left = new Node(20);
  tree.right = new Node(30);
  tree.left.right = new Node(40);
  tree.left.left = new Node(50);
  tree.right.right = new Node(70);
  tree.right.left = new Node(60);
  
  console.log(height(tree));