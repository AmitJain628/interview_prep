function cloneGrap(node) {
    if (!node) return null;
    let queue = [node];
    let map = new Map();
    map.set(node, new Node(node.val));

    while(queue.length) {
        let curr = queue.shift();

        for (let child of curr.neighbors) {
            if (!map.has(child)) {
                map.set(child, new Node(child.val));
                queue.push(child);
            }

            map.get(curr).neighbors.push(map.get(child));
        }
    }

    return map.get(node);
}