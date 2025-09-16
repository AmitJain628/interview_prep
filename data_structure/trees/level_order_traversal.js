function levelOrderTraversal(root) {
    let result  = [];

    if (root === null) return result;

    let queue = [root];

    while(queue.length > 0) {
        let level = [];
        let size = queue.length;

        for (let i = 0; i < size; i++) {
            let node = queue.shift();
            level.push(node.value);
            if(node.left) queue.push(node.left);
            if(node.right) queue.push(node.right);
        }

        result.push(level);
    }

    return result;
}