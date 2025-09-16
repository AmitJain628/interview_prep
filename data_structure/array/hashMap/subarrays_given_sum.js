const nums = [1,1,1];
const k = 2;


var subarraySum = function(nums, k) {
    const map = new Map();
    let count = 0;
    let sum = 0;
    map.set(0, 1);

    for (let num of nums) {
       sum += num;
       const rem = sum - k;

       if(map.has(rem)) {
        count += map.get(rem);
       }

       map.set(sum , (map.get(sum) || 0) + 1);
    }

   return count;
};