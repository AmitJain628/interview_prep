/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
var canFinish = function(numCourses, prerequisites) {
    let prequistes = new Array(numCourses).fill(0);
    let map = new Map();

    for (let [course, pre] of prerequisites) {
        if (!map.has(pre)) {
           map.set(pre, []);
        }
        map.get(pre).push(course);
        prequistes[course]++;
    }

    console.log(map, prequistes)
    
    let queue = [];
    for (let i=0; i<prequistes.length; i++) {
        if (prequistes[i] === 0) {
            queue.push(i)
        }
    }
    
    let courses = 0;
    while(queue.length) {
        let v = queue.shift();
        courses++;

        if(map.has(v)) {
            const vertices = map.get(v);
            console.log("vertices", vertices)
            for (let edges of map.get(v)) {
               prequistes[edges]--;
               if(prequistes[edges] === 0) {
                queue.push(edges);
               } 
            }
        }
    }


    return numCourses === courses

}