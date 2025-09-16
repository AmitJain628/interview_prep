function topView(root) {
    if (!root) return [];

    let queue = [];
    let map = new Map();

    queue.push({node: root, col: 0});

    while(queue.length) {
        let size = queue.length;
        while(size>0) {
            let {node, col} = queue.shift();
            if (!map.has(col)) {
                map.set(col, []);
            }
            map.get(col).push(node.val);

            if (node.left) {
                queue.push({node: node.left, col: col-1})
            }

            if (node.right) {
                queue.push({node: node.right, col: col+1})
            }
            size--;
        }
    }

    let sortedCols = [...map.keys()].sort((a,b) => a - b);
    return sortedCols.map((col) => {
        return map.get(col)[0];
    });
}