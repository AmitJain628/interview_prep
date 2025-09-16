/*

Topological sorting is a linear ordering of vertices in a Directed Acyclic Graph (DAG) such that for every directed edge (u → v), vertex u appears before vertex v in the ordering.

It is primarily used in:

Task scheduling (e.g., resolving dependencies)
Build systems (compiling source files in order)
Course prerequisite planning

*/

function topologicalSortDFS(V, adj) {
 let visited = new Array(V).fill(false);
 let stack = [];

 for (let i = 0; i < V; i++) {
    if (!visited[i]) {
        dfs(i, visited, adj, stack);
    }
 }

 return stack.reverse();
}

function dfs(u, visited, adj, stack) {
      visited[u] = true;

      for (let v of adj[u]) {
        if (!visited[v]) {
            dfs(v, visited, adj, stack);
        }
      }

      stack.push(u);
}