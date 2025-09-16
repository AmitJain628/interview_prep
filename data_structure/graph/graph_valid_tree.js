function graphValidTree(n , edges) {
    if (edges.length !== n - 1) return false; // A tree must have exactly (n - 1) edges

    let adjacentList = {};
    for(let i = 0; i <n; i++) {
        adjacentList[i] = [];
    }

    for( let [u, v] of edges ) {
        adjacentList[u].push(v);
        adjacentList[v].push(u);
    }

    const visited = new Set();

    const dfs = (node, parent) => {
       if(visited.has(node)) return false; //

       visited.add(node);

       for(let neighbor of adjacentList[node]) {
           if(neighbor !== parent) {
            if (!dfs(neighbor, node)) return false;
        }
       }

       return true;
    }

    if (!dfs(0, -1)) return false;
    return visited.size === n;
}