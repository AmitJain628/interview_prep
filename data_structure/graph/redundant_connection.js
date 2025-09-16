/*
[[1,2],[2,3],[3,4],[1,4],[1,5]]

Use this method to find cycle in undirected graph
 
parent -> [0, 1, 2, 3, 4, 5]

edge1 -> 1  parent -> 1
edge2 -> 2  parent -> 2

parent -> [0, 1, 1, 3, 4, 5]

edge1 -> 2  parent -> 1
edge2 -> 3  parent -> 3

parent -> [0, 1, 1, 1, 4, 5]

edge1 -> 3  parent -> 1
edge2 -> 4  parent -> 4

parent -> [0, 1, 1, 1, 1, 5]

edge1 -> 1  parent -> 1
edge2 -> 4  parent -> 4

*/

function redundantConnections(edges) {

    // create parent array
    let parents = []
    for(let i =1; i <= edges.length; i++) {
        parents[i] = i;
    }

    // check edges ony one by to identify parent

    for(let i = 0; i < edges.length; i++) {
        let [edge1, edge2] = edges[i];


        let root1 = findParent(parents, edge1);
        let root2 = findParent(parents, edge2);

        if (root1 === root2) {
            return edges[i];
        }

        parents[root2] = root1;
    }

    function findParent(parents, edge) {
        while(edge !== parents[edge]) {
            parents[edge] = parents[parents[edge]];
            edge = parents[edge];
        }

        return edge
    }
}