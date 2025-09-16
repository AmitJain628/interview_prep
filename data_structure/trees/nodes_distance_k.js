/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} start
 * @return {number}
 */
var amountOfTime = function(root, start) {
    let queue = [];
     let map = new Map();
 
     function dfs(root, parent) {
         if (root === null) return;
         map.set(root, parent);
         dfs(root.left, root);
         dfs(root.right, root);
     }
     function findNode(root, target) {
     if (!root) return null;
     if (root.val === target) return root;
     let left = findNode(root.left, target);
     if (left) return left;
     return findNode(root.right, target);
     }
 
     dfs(root, null);
 
     let visited = new Set();
     let startNode = findNode(root, start);  // Find the actual node by its value
     queue.push(startNode);
     visited.add(startNode);
     let time = 0;
     while(queue.length > 0) {
         let size = queue.length;
         while(size > 0) {
             let element = queue.shift();
             if(element.left && !visited.has(element.left)) {
                   queue.push(element.left);
                   visited.add(element.left);
             }
             if(element.right && !visited.has(element.right)) {
                 queue.push(element.right);
                 visited.add(element.right);
             }
             let parent = map.get(element);
             if(parent && !visited.has(parent)) {
                 queue.push(parent);
                 visited.add(parent);
             }            
             size--
         }
         time++;
     }
 
     return time-1;
   
 };