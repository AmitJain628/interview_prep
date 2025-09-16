function connectedComponent(n, edges) {
  let adjacentList = {};
  for (let i = 0; i < n; i++) {
    adjacentList[i] = [];
  }
  let visited = new Set();
  let components = 0;

  for (let [from, to] of edges) {
      adjacentList[from].push(to);
      adjacentList[to].push(from);
}

  console.log(adjacentList);

  const dfs = (edge) => {
    const stack = [edge];
    while (stack.length > 0) {
        const current = stack.pop();
        for (let neighbor of adjacentList[current]) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                stack.push(neighbor);
            }
        }
    }
  }

  for (let i = 0; i<n; i++) {
    if(!visited.has(i)) {
       visited.add(i);
       dfs(i);
       components++;
    }
  }


  return components;
}

console.log("components", connectedComponent(5, [[0, 1], [1, 2], [3, 4]]));
