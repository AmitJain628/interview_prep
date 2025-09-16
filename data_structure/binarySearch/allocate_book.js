function allocateBooks(arr, students) {
   if (arr.length < students) return -1;

   function canArrange(max) {
      let stud = 1;
      let count = 0;

      for (let i = 0; i < arr.length; i++) {
           if (arr[i] + count <= max) {
              count += arr[i]
           }  else {
         stud++; count = arr[i];
           }
      }

      return stud === students;
   }
   
    function getMax() {
    let max = -Infinity;
    for (let i = 0; i < arr.length; i++) {
        max = Math.max(max, arr[i]);
    }

    return max;
   }

    let left = getMax();
    let right = arr.reduce((acc, val) => acc + val, 0);
    let ans = -1
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        if (canArrange(mid)) {
            ans = mid;
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }

    return ans;
}