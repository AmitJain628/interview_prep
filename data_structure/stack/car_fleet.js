/**
 * @param {number} target
 * @param {number[]} position
 * @param {number[]} speed
 * @return {number}
 */
var carFleet = function(target, position, speed) {
    let stack = [];
        const cars = position.map((p,i) => [p, speed[i]]);
        cars.sort((a,b) => b[0] - a[0]);
        let fleetCount = 0;

        let prevTime = 0;
        for(let [pos, sp] of cars) {
           let time = (target - pos) /sp;
           if (time > prevTime) {
             fleetCount++;
             prevTime = time;
           }
        }

        return fleetCount;

};