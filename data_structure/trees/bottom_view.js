var verticalTraversal = function(root) {
 let queue = [];
 let x = 0;
 let y = 0;
 let res = [];
 queue.push({row: 0, col: 0, node: root});
 const map = new Map();

 while(queue.length) {
     let size = queue.length;

     while(size>0) {
         let {row,col, node} = queue.shift();
         if (!map.has(col)) {
             map.set(col, []);
           }
           map.get(col).push({val: node.val, row: row });
         if (node.left) {
             queue.push({col: col - 1, row: row+1, node: node.left});
         }

         if (node.right) {
             queue.push({col: col + 1, row: row+1, node: node.right});
         }
         size--
     }
 }

const sortedCols = [...map.keys()]
.map(Number).sort((a, b) => a -b);

return sortedCols.map((col) => {
   map.get(col).sort((a, b) => {
    map.get(col).sort((a, b) => {
        if (a.row === b.row) return a.val - b.val;
        return b.row - a.row;
    });

   });


   return map.get(col)[0].val;
})
};