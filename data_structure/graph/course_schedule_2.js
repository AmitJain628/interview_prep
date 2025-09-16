/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {number[]}
 */
var findOrder = function(numCourses, prerequisites) {
    let map = new Map();
    let courses = new Array(numCourses).fill(0);

    for(let [course, pre] of prerequisites) {
        courses[course]++;
        if(!map.has(pre)) {
            map.set(pre, [])
        }
        map.get(pre).push(course);
    }
    let order = [];
    let queue = []

   for (let i=0; i<courses.length; i++) {
        if (courses[i] === 0) {
            queue.push(i)
        }
    }
    

    while(queue.length) {
        let curr = queue.shift();
        order.push(curr);

        if (map.has(curr)) {
            for(let edges of map.get(curr)) {
                courses[edges]--;
                if(courses[edges] === 0) {
                    queue.push(edges);
                }
            }
        }
    }

    return numCourses === order.length ? order : []
};