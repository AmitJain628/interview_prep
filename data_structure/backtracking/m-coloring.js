function mColoring(v, edges, m) {
  let graph = Array(v).fill().map(() => Array(v).fill(0));
  for (let [u, w] of edges) {
    graph[u][w] = 1;
    graph[w][u] = 1;
  }

  const color = new Array(v).fill(0);

  function colorutil(vertices) {
    if (vertices === graph.length) return true;

    for(let c = 1; c <= m; c++) {
        if(isSafe(vertices, c)) {
            color[vertices] = c;
            if (colorutil(vertices + 1)) return true;
            color[vertices] = 0;
        }
    }

    return false;
  }

  function isSafe(vertices, c) {
    for(let i=0; i<graph[vertices].length; i++) {
        if (graph[vertices][i] === 1 && color[i] === c) return false;
    }

    return true;
  }
  
  return colorutil(0);
}

const v = 4; // Number of vertices
const edges = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 0],
    [0, 2]
]; // Edges list

const m = 3; // Maximum number of colors allowed

console.log(mColoring(v, edges, m));